import { Router } from "express";
import auth from "@/middlewares/auth.middleware";
import UserCtrl from "@/controllers/v1/user.controller";

const router: Router = Router();

router.get("/current", auth(), UserCtrl.getCurrentUser);

export default router;