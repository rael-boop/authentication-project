import { Request, Response } from "express";

import response from "@/utilities/response";
import UserService from "@/services/v1/user.service";

class UserController {
    async getCurrentUser(req: Request, res: Response) {
        const result = await UserService.getCurrentUser(req);
        res.status(201).send(response("user retrieved successfully", result));
    }
}

export default new UserController();