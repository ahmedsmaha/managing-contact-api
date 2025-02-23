import { Router } from "express";
import { ContactController } from "../controllers/contact.controller";
import {AuthMiddleware} from "../middleware/auth.middleware";

const router = Router();

router.post("/", AuthMiddleware.authenticate , ContactController.create);
router.get("/", AuthMiddleware.authenticate, ContactController.list);
router.put("/:id", AuthMiddleware.authenticate, ContactController.update);
router.delete("/:id", AuthMiddleware.authenticate, ContactController.delete);

export { router as ContactRoutes };
