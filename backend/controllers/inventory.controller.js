import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import sql from '../db/db02.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'

const fetch_all = asyncHandler(async (req, res) => {
    const query = `SELECT * FROM inventory`;
    const result = await sql.query(query);

    res.status(200).json(new ApiResponse(200, result, 'Inventory fetched successfully!'));
})

const add_item = asyncHandler(async (req, res) => {
    const { name, quantity , unit } = req.body;
    const image = req.files.image[0];

    if (!name || !unit || !quantity || !image) {
        throw new ApiError(400, 'All fields are required!');
    }

    const imageUrl = await uploadOnCloudinary(image.path);

    const query = `INSERT INTO inventory (item_name, quantity , image_url , unit) VALUES ($1, $2, $3, $4, $5)`;
    const values = [name , quantity, imageUrl , unit];
    
    await sql.query(query, values);

    res.status(201).json(new ApiResponse(201, null, 'Item added successfully!'));
})

const update_item = asyncHandler(async (req, res) => {
})

const delete_item = asyncHandler(async (req, res) => {
    const { name } = req.body;
    
    if (!name) {
        throw new ApiError(400, 'Item name is required for deletion!');
    }
    
    // Check if item exists
    const checkQuery = `SELECT * FROM inventory WHERE item_name = $1`;
    const checkResult = await sql.query(checkQuery, [name]);
    
    if (checkResult.length === 0) {
        throw new ApiError(404, 'Item not found!');
    }
    
    // Delete the item
    const deleteQuery = `DELETE FROM inventory WHERE item_name = $1 RETURNING *`;
    const result = await sql.query(deleteQuery, [name]);
    
    res.status(200).json(new ApiResponse(200, result[0], 'Item deleted successfully!'));
})

export {
    fetch_all,
    add_item,
    update_item,
    delete_item
}