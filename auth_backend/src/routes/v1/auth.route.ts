import { Router } from "express";
import AuthCtrl from "@/controllers/v1/auth.controller";

const router: Router = Router();

router.post("/login", AuthCtrl.login);

router.post("/register", AuthCtrl.register);

export default router;