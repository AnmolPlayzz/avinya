import {Router} from "express"
import { fetch_all } from "../controllers/events.controller.js"

const eventsRouter = Router();

eventsRouter.route('/').get(fetch_all);

export default eventsRouter