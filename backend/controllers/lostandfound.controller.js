import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import sql from '../db/db01.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'

const fetch_all = asyncHandler(async (req, res) => {
    try {

        const query01 = 'SELECT * FROM lost_item'

        let result01 = await sql.query(query01)

        result01 = result01.map((row) => ({
            ...row,
            type : 'lost',
        }));

        const query02 = 'SELECT * FROM found_item'

        let result02 = await sql.query(query02)

        result02 = result02.map((row) => ({
            ...row,
            type : 'found',
        }));

        const result = [
            ...result01,
            ...result02
        ]

        res
            .status(200)
            .json(new ApiResponse(200, result,'lost and found fetch successfully!'))

    } catch (error) {
        throw new ApiError(500, "Internal Server Error", error.message)
    }
})

const lost_input = asyncHandler(async (req, res) => {
    try {
        const { name, description, location, date, image } = req.body
        
        if (!name || !description || !location || !date) {
            throw new ApiError(400, "Bad Request", "All fields are required")
        }
        
        const imageLocalPath = image?.path
        let imageUploadResponse;
        
        if (imageLocalPath) {
            imageUploadResponse = await uploadOnCloudinary(imageLocalPath)
        } else {
            imageUploadResponse = {
                public_id: null,
                secure_url: null
            }
        }
        
        // Fix the query by ensuring column names match exactly with your database schema
        // and are in the same order as the values
        const query = `INSERT INTO lost_item (name, description, date, location, image_url) VALUES ($1, $2, $3, $4, $5)`
        const values = [name, description, date, location, imageUploadResponse?.secure_url]
        
        const result = await sql.query(query, values)
        
        res.status(200).json(new ApiResponse(200, result, "Lost item added successfully!"))
    } catch (error) {
        res.status(500).json(new ApiError(500, "Internal Server Error", error.message))
    }
})

const found_input = asyncHandler(async (req, res) => {
    try {
        const { name, description, location, date } = req.body
        const image = req.files?.image || req.body.image // Depending on how your image is sent
        
        // Check required fields
        if (!name || !description || !location || !date) {
            return res.status(400).json(new ApiError(400, "Bad Request", "Name, description, location, and date are required"))
        }
        
        // Check if image exists
        if (!image) {
            return res.status(400).json(new ApiError(400, "Bad Request", "Image is required"))
        }
        
        // Get image path
        const imageLocalPath = image.path || image.tempFilePath
        if (!imageLocalPath) {
            return res.status(400).json(new ApiError(400, "Bad Request", "Invalid image format"))
        }
        
        // Upload image to Cloudinary
        const imageUploadResponse = await uploadOnCloudinary(imageLocalPath)
        if (!imageUploadResponse || !imageUploadResponse.secure_url) {
            return res.status(500).json(new ApiError(500, "Image Upload Failed", "Failed to upload image"))
        }
        
        // Insert into database
        const query = `INSERT INTO found_item (name, description, date, location, image_url) VALUES ($1, $2, $3, $4, $5)`
        const values = [name, description, date, location, imageUploadResponse.secure_url]
        
        const result = await sql.query(query, values)
        
        return res.status(200).json(new ApiResponse(200, result, "Found item added successfully!"))
    } catch (error) {
        console.error("Found input error:", error)
        return res.status(500).json(new ApiError(500, "Internal Server Error", error.message))
    }
})


export {
    fetch_all,
    lost_input,
    found_input
}