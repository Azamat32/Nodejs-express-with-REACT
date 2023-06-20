import Router from "express";
import { BrandController } from "../controllers/brandController.js";
const brandController = new BrandController();
const router = new Router();

router.post("/", brandController.create);
router.get("/", brandController.getAll);

export default router;
