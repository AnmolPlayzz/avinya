import {Router} from "express"
import { fetch_all, add_item , delete_item} from "../controllers/inventory.controller.js"
import {upload} from '../middlewares/multer.middleware.js'

const inventoryRouter = Router();

inventoryRouter.route('/').get(fetch_all);
inventoryRouter.route('/add-item').post(upload.single('image'),add_item);
inventoryRouter.route('/update-item').patch(upload.single('image'),add_item);
inventoryRouter.route('/delete-item').delete(delete_item);

export default inventoryRouter