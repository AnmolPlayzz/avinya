import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import sql from '../db/db01.js';

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
        res.status(200).json(new ApiResponse(200, "OK", "Healthcheck is working fine! checking 1 2 3"))
    } catch (error) {
        throw new ApiError(500, "Internal Server Error", error.message)
    }
})

const found_input = asyncHandler(async (req, res) => {
    try {
        res.status(200).json(new ApiResponse(200, "OK", "Healthcheck is working fine! checking 1 2 3"))
    } catch (error) {
        throw new ApiError(500, "Internal Server Error", error.message)
    }
})

export {
    fetch_all,
    lost_input,
    found_input
}