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

    if (!name || !discription) {
        throw new ApiError(400, "Name and description are required");
    }

    const image = req.file?.path || null;

    if (!image) {
        throw new ApiError(400, "Image is required");
    }

    try {
        const uploadResult = await uploadOnCloudinary(image);

        if (!uploadResult?.secure_url) {
            throw new ApiError(500, "Image upload failed");
        }

        const imageUrl = uploadResult.secure_url;

        // Use PostgreSQL-style parameterized query
        const query = `
            INSERT INTO events (name_of_event, description, image_url)
            VALUES ($1, $2, $3)
        `;
        const values = [name, discription, imageUrl];

        await sql.query(query, values);

        return res.status(201).json(
            new ApiResponse(201, null, "Event added successfully!")
        );
    } catch (error) {
        console.error("Add event error:", error);
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
    let paramIndex = 3;

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