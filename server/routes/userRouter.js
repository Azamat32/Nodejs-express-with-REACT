import Router from "express";
import { UserController } from "../controllers/userController.js";
const router = new Router();
const userController = new UserController();

router.post("/registration", userController.registration.bind(userController));
router.post("/login", userController.login.bind(userController));

router.get("/auth", userController.check.bind(userController));

export default router;
