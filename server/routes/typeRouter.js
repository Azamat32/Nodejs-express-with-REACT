import Router from "express";
import { TypeController } from "../controllers/typeController.js";
import checkRole from "../middleware/checkRoleMiddleware.js";
const typeController = new TypeController();

const router = new Router();
router.post("/", checkRole("ADMIN"), typeController.create);
router.get("/", typeController.getAll);

export default router;
