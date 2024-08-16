import ms from "ms";
import Joi from "joi";
import { Request } from "express";

import { CONFIGS } from "@/configs";
import UserModel from "@/models/user.model";
import CustomError from "@/utilities/custom-error";
import { encryptString, decryptString, hashPassword, validatePassword, generateSalt } from "@/utilities/helpful-methods";

class AuthService {
    async register({ body }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                name: Joi.string().trim().required().label("name"),
                password: Joi.string().min(8).required().label("password"),
                email: Joi.string().trim().email().lowercase().required().label("email"),
                permissions: Joi.array().items(Joi.string()).default([]).label("permissions"),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ body });
        if (error) throw new CustomError(error.message, 400);

        const emailExist = await UserModel.findOne({ email: data.body.email });
        if (emailExist) throw new CustomError("email already exists", 400);

        const passwordSalt = generateSalt(12);
        const passwordSaltEncrypted = encryptString(passwordSalt);

        const passwordHash = hashPassword(data.body.password, passwordSalt);

        // Create new user
        const user = await new UserModel({
            name: data.body.name,
            email: data.body.email,
            password: passwordHash,
            permissions: data.body.permissions,
            password_salt: passwordSaltEncrypted
        }).save();

        // Generate authentication token
        const secret = encryptString(CONFIGS.AUTH_TOKEN_SECRET);
        const authenticationPayload = { 
            secret,
            _id: user._id, 
            system_name: CONFIGS.APP_NAME,
            permissions: user.permissions,
            created_at: new Date().toISOString(),
            expiries_at: new Date(Date.now() + ms("30 days")).toISOString() 
        };
        const accessToken = encryptString(JSON.stringify(authenticationPayload));

        return { user, access_token: accessToken };
    }

    async login({ body }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            body: Joi.object({
                email: Joi.string().trim().email().lowercase().required().label("email"),
                password: Joi.string().required().label("password"),
            }),
        })
            .options({ stripUnknown: true })
            .validate({ body });
        if (error) throw new CustomError(error.message, 400);

        // Check if email exists
        const user = await UserModel.findOne({ email: data.body.email }).select("+password +password_salt");
        if (!user) throw new CustomError("incorrect email or password", 400);

        // Check if password is correct
        const salt = decryptString(user.password_salt)
        const validPassword = validatePassword(data.body.password, user.password, salt);
        if (!validPassword) throw new CustomError("incorrect email or password", 400);

        const secret = encryptString(CONFIGS.AUTH_TOKEN_SECRET);
        const authenticationPayload = { 
            secret,
            _id: user._id, 
            system_name: CONFIGS.APP_NAME,
            permissions: user.permissions,
            created_at: new Date().toISOString(),
            expiries_at: new Date(Date.now() + ms("30 days")).toISOString() 
        };
        const accessToken = encryptString(JSON.stringify(authenticationPayload));

        return { user, access_token: accessToken };
    }
}

export default new AuthService();
