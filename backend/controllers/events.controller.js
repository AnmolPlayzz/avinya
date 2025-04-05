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

const edit_event = asyncHandler(async (req, res) => {

})

const delete_event = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json(new ApiError(400, "Bad Request", "ID is required"))
        }

        const query01 = 'DELETE FROM lost_item WHERE id = ?'
        const query02 = 'DELETE FROM found_item WHERE id = ?'

        await sql.query(query01, [id])
        await sql.query(query02, [id])

        res
            .status(200)
            .json(new ApiResponse(200, null,'Event deleted successfully!'))

    } catch (error) {
        throw new ApiError(500, "Internal Server Error", error.message)
    }
})

export {
    fetch_all,
    edit_event,
    delete_event
}