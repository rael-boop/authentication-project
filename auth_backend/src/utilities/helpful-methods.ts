import crypto from "crypto";
import { CONFIGS } from "@/configs";

export const trimObjectStrings = (obj: any) => {
    if (typeof obj === "string") {
        return obj.trim();
    } else if (typeof obj === "object") {
        for (const key in obj) {
            // eslint-disable-next-line no-prototype-builtins
            if (obj.hasOwnProperty(key)) {
                obj[key] = trimObjectStrings(obj[key]);
            }
        }

        return obj;
    } else {
        return obj;
    }
};

const getKey = () => {
    const key = crypto.createHash("sha256").update(String(CONFIGS.OAUTH_TOKEN.ENCRYPTION_SECRET)).digest("base64").slice(0, 32);
    // Define the initialization vector (IV)
    const iv = Buffer.alloc(16, 0);
    Buffer.from(CONFIGS.OAUTH_TOKEN.IV_SECRET, "base64").copy(iv);
    return { key, iv };
};

export const encryptString = (text: string): string => {
    const { key, iv } = getKey();
    const cipher = crypto.createCipheriv(CONFIGS.OAUTH_TOKEN.ENCRYPTION_ALGO, key, iv);

    var encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
};

export const decryptString = (text: string): string => {
    const { key, iv } = getKey();
    const decipher = crypto.createDecipheriv(CONFIGS.OAUTH_TOKEN.ENCRYPTION_ALGO, key, iv);

    var decrypted = decipher.update(text, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
};

export const generateSalt = (length: number) => {
    return crypto.randomBytes(length).toString('hex');
};

export const hashPassword = (password: string, salt: string): string => {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const hashedPassword = hash.digest('hex');

    return hashedPassword;
};

export const validatePassword = (password: string, hashedPassword: string, salt: string,): boolean => {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const hashedAttempt = hash.digest('hex');

    return hashedAttempt === hashedPassword;
};
