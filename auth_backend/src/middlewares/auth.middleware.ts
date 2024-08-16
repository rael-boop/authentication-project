import { Request, Response, NextFunction } from "express";

import { CONFIGS } from "@/configs";
import User from "@/models/user.model";
import CustomError from "@/utilities/custom-error";
import { decryptString } from "@/utilities/helpful-methods";

function auth() {
    return async (req: Request, _res: Response, next: NextFunction) => {
        if (!req.headers.authorization) throw new CustomError("-middleware/no-token", 401);

        const token: string = req.headers.authorization.split(" ")[1] as string;

        const decoded: any = JSON.parse(decryptString(token));

        const secret = decryptString(decoded.secret);
        if (secret !== CONFIGS.AUTH_TOKEN_SECRET) throw new CustomError("-middleware/invalid-token", 401);

        const expiryDate = new Date(decoded.expiries_at);
        if (expiryDate < new Date()) throw new CustomError("-middleware/token-expired", 401);

        const user = await User.findOne({ _id: decoded._id });

        // user not found
        if (!user) throw new CustomError("-middleware/user-not-found", 401);

        // Attach user to request
        req.$currentUser = user.toObject();

        next();
    };
}

export default auth;
