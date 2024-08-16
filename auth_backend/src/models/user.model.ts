import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    permissions: string[];
    password_salt: string;
    created_at: Date;
    updated_at: Date;
}

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        permissions: {
            type: [String],
            required: true,
            default: []
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        password_salt: {
            type: String,
            required: true,
            select: false,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

export default mongoose.model<IUser>("users", userSchema);
