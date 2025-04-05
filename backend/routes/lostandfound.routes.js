import {Router} from "express"
import { fetch_all,lost_input,found_input } from "../controllers/lostandfound.controller.js"

const lostandfoundRouter = Router();

lostandfoundRouter.route('/').get(fetch_all);
lostandfoundRouter.route('/lost-input').post(lost_input);
lostandfoundRouter.route('/found-input').post(found_input);

export default lostandfoundRouter