import dotenv from "dotenv";
import packageInfo from "../../package.json";

dotenv.config();

const CONFIGS = {
    PORT: process.env.PORT || 4000,
    NODE_ENV: process.env.NODE_ENV || "development",

    APP_VERSION: packageInfo.version,
    APP_NAME: process.env.APP_NAME || "Application",

    MONGODB_URI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/custom-authentication-app",
    
    URL: {
        BASE_URL: process.env.BASE_URL || `http://localhost:${process.env.PORT || 8000}`,
    },

    OAUTH_TOKEN: {
        ENCRYPTION_ALGO: "aes-256-cbc",
        IV_SECRET: process.env.OAUTH_TOKEN_IV_SECRET || "abdc12344444",
        ENCRYPTION_SECRET: process.env.OAUTH_TOKEN_ENCRYPTION_SECRET || "abdc00001234"
    },

    AUTH_TOKEN_SECRET: process.env.AUTH_TOKEN_SECRET || "abdc-1234-0000-1234",
};

// Uncomment this line to see the configs
// console.log(CONFIGS);

export { CONFIGS };
