import Router from "express";
import { TypeController } from "../controllers/typeController.js";
const typeController = new TypeController();

const router = new Router();
router.post("/", typeController.create);
router.get("/", typeController.getAll);

export default router;
