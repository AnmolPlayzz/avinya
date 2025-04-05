import {Router} from "express"
import { fetch_all,lost_input,found_input } from "../controllers/lostandfound.controller.js"
import {upload} from '../middlewares/multer.middleware.js'

const lostandfoundRouter = Router();

lostandfoundRouter.route('/').get(fetch_all);
lostandfoundRouter.route('/lost-input').post(upload.single('image'),lost_input);
lostandfoundRouter.route('/found-input').post(upload.single('image'),found_input);

export default lostandfoundRouter