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
    const { name, quantity, barcode, type, price } = req.body;
    const imageFile = req.file;

    if (!name || !quantity || !type || !price) {
        throw new ApiError(400, 'Name, quantity, type, and price are required fields!');
    }

    if (type !== 'food' && type !== 'item') {
        throw new ApiError(400, 'Type must be either "food" or "item"!');
    }

    if (type === 'item' && !barcode) {
        throw new ApiError(400, 'Barcode number is required for sealed pack items!');
    }

    let imageUrl = "https://default-image.url";
    if (imageFile) {
        imageUrl = await uploadOnCloudinary(imageFile.path);
    }

    const barcodeValue = type === 'item' ? barcode : null;

    try {
        const query = `
            INSERT INTO inventory (item_name, quantity, barcode, type, price, image)
            VALUES ($1, $2, $3, $4, $5, $6);
        `;

        const values = [name, quantity, barcodeValue, type, price, imageUrl.secure_url];
        const result = await sql.query(query, values);

        res.status(201).json(new ApiResponse(201, result, 'Item added successfully!'));
    } catch (error) {
        console.error('Insert Error:', error);
        throw new ApiError(500, `Database error: ${error.message}`);
    }
});

const update_item = asyncHandler(async (req, res) => {
    const { id, name, quantity, barcode, type, price } = req.body;
    const imageFile = req.file;

    if (!id) {
        throw new ApiError(400, 'Item ID is required for update!');
    }

    // Validate type if provided
    if (type && type !== 'food' && type !== 'item') {
        return res.status(400).json(new ApiError(400, 'Type must be either "food" or "item"!'));
    }

    // Determine barcode logic based on type
    const finalType = type;
    const finalBarcode = barcode;

    if (finalType === 'item' && !finalBarcode) {
        return res.status(400).json(new ApiError(400, 'Barcode number is required for sealed pack items!'));
    }

    // Handle image upload if provided
    let imageUrl;
    if (imageFile) {
        const uploadedImage = await uploadOnCloudinary(imageFile.path);
        if (!uploadedImage?.secure_url) {
            return res.status(400).json(new ApiError(400, 'Image upload failed!'));
        }
        imageUrl = uploadedImage.secure_url;
    }

    // Dynamically build update query
    const fields = [];
    const values = [];
    let index = 1;

    if (name !== undefined) {
        fields.push(`item_name = $${index++}`);
        values.push(name);
    }

    if (quantity !== undefined) {
        fields.push(`quantity = $${index++}`);
        values.push(quantity);
    }

    if (type === 'food') {
        fields.push(`barcode = NULL`);
    } else if (barcode !== undefined) {
        fields.push(`barcode = $${index++}`);
        values.push(barcode);
    }

    if (type !== undefined) {
        fields.push(`type = $${index++}`);
        values.push(type);
    }

    if (price !== undefined) {
        fields.push(`price = $${index++}`);
        values.push(price);
    }

    if (imageUrl !== undefined) {
        fields.push(`image = $${index++}`);
        values.push(imageUrl);
    }

    if (fields.length === 0) {
        return res.status(400).json(new ApiError(400, 'No fields provided for update!'));
    }

    // Add the id to the values array
    values.push(id);

    const updateQuery = `
        UPDATE inventory 
        SET ${fields.join(', ')}
        WHERE id = $${index}
    `;

    try {
        const result = await sql.query(updateQuery, values);

        if (result.rowCount === 0) {
            return res.status(404).json(new ApiError(404, 'Item not found or nothing updated!'));
        }

        res.status(200).json(new ApiResponse(200, result, 'Item updated successfully!'));
    } catch (error) {
        throw new ApiError(500, `Database error: ${error.message}`);
    }
});

const delete_item = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        throw new ApiError(400, 'Item ID is required for deletion!');
    }

    if (isNaN(id)) {
        return res.status(400).json(new ApiError(400, 'Invalid ID format!'));
    }

    try {
        const query = `DELETE FROM inventory WHERE id = $1`;
        await sql.query(query, [id]);

        res.status(200).json(new ApiResponse(200, null, 'Item deleted successfully!'));
    } catch (err) {
        console.error('Delete Error:', err);
        throw new ApiError(500, `Database error: ${err.message}`);
    }
});


export {
    fetch_all,
    add_item,
    update_item,
    delete_item
}