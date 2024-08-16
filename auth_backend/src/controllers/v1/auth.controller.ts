import { Request, Response } from "express";

import response from "@/utilities/response";
import AuthService from "@/services/v1/auth.service";

class AuthController {
    async login(req: Request, res: Response) {
        const result = await AuthService.login(req);
        res.status(201).send(response("user login successful", result));
    }

    async register(req: Request, res: Response) {
        const result = await AuthService.register(req);
        res.status(200).send(response("user registration successful", result));
    }
}


export default new AuthController();