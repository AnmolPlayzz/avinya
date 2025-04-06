import {Router} from "express"
import { fetch_all,delete_event, add_event,edit_event } from "../controllers/events.controller.js"
import { upload } from "../middlewares/multer.middleware.js";

const eventsRouter = Router();

eventsRouter.route('/').get(fetch_all);
eventsRouter.route('/delete').post(delete_event);
eventsRouter.route('/').post(upload.single('image'),add_event);
eventsRouter.route('/edit').post(upload.single('image'),edit_event);

export default eventsRouter