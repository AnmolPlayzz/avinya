import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import sql from '../db/db01.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'

const fetch_all = asyncHandler(async (req, res) => {
    try {
        const query01 = 'SELECT * FROM events'

        let result01 = await sql.query(query01)
        res
            .status(200)
            .json(new ApiResponse(200, result01,'lost and found fetch successfully!'))

    } catch (error) {
        throw new ApiError(500, "Internal Server Error", error.message)
    }
})

const add_event = asyncHandler(async (req, res) => {
    const { name, discription } = req.body;
    
    // Check if required fields are present
    if (!name || !discription) {
        return res
            .status(400)
            .json(new ApiError(400, "Bad Request", "Name and description are required"));
    }
    
    // Check if image file is present
    if (!req.file) {
        return res
            .status(400)
            .json(new ApiError(400, "Bad Request", "Image is required"));
    }
    
    try {
        // Upload the image to Cloudinary
        const uploadResult = await uploadOnCloudinary(req.file.path, "events");
        
        if (!uploadResult || !uploadResult.secure_url) {
            return res
                .status(500)
                .json(new ApiError(500, "Internal Server Error", "Image upload failed"));
        }
        
        const imageUrl = uploadResult.secure_url;
        
        // Use parameterized query to prevent SQL injection
        const query = "INSERT INTO events (event_name, discription, image) VALUES (?, ?, ?)";
        const values = [name, discription, imageUrl];
        
        await sql.query(query, values);
        
        res
            .status(201)
            .json(new ApiResponse(201, null, 'Event added successfully!'));
            
    } catch (error) {
        throw new ApiError(500, "Internal Server Error", error.message);
    }
});

const delete_event = asyncHandler(async (req, res) => {
    const id = req.body?.id;
    
    if (!id) {
        throw new ApiError(400, "ID is required");
    }

    if (isNaN(id)) {
        throw new ApiError(400, "ID must be a number");
    }


    await sql`DELETE FROM events WHERE id = ${id}`;

    return res.status(200).json(new ApiResponse(200, null, 'Event deleted successfully!'));
});


const edit_event = asyncHandler(async (req, res) => {
    const { id, name, discription } = req.body;

    if (!id || !name || !discription) {
        throw new ApiError(400, "ID, name, and description are required");
    }

    const image = req.file?.path || null;
    let imageUrl = null;

    if (image) {
        const uploaded = await uploadOnCloudinary(image);
        if (!uploaded?.secure_url) {
            throw new ApiError(500, "Image upload failed");
        }
        imageUrl = uploaded.secure_url;
    }

    let query = `UPDATE events SET name_of_event = $1, description = $2`;
    const values = [name, discription];
    let paramIndex = 3; // Start from $3

    if (imageUrl) {
        query += `, image_url = $${paramIndex}`;
        values.push(imageUrl);
        paramIndex++;
    }

    query += ` WHERE id = $${paramIndex}`;
    values.push(id);

    const result = await sql.query(query, values);

    return res.status(200).json(new ApiResponse(200, result, 'Event updated successfully!'));
});



export {
    fetch_all,
    edit_event,
    delete_event,
    add_event
}