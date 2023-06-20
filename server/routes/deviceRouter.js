import Router from "express";
import { DeviceController } from "../controllers/deviceController.js";
const deviceController = new DeviceController();
const router = new Router();

router.post("/", deviceController.create);
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);
export default router;
