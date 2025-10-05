import dotenv from "dotenv";

dotenv.config()

interface EnvConfig {
    PORT: string,
    DATABASE_URL: string,
    NODE_ENV: "development" | "production"
    GOOGLE_CLIENT_SECRET: string
    GOOGLE_CLIENT_ID: string
    FRONTEND_URL: string
    CLOUDINARY: {
        CLOUDINARY_CLOUD_NAME: string;
        CLOUDINARY_API_KEY: string;
        CLOUDINARY_API_SECRET: string;
    };
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables: string[] = ["PORT", "DATABASE_URL", "NODE_ENV", "GOOGLE_CLIENT_SECRET", "GOOGLE_CLIENT_ID", "CLOUDINARY_CLOUD_NAME",
        "CLOUDINARY_API_KEY",
        "CLOUDINARY_API_SECRET",
    ];

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require environment variabl ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        DATABASE_URL: process.env.DATABASE_URL!,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string,
        CLOUDINARY: {
            CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
            CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
            CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
        },
    }
}

export const envVars = loadEnvVariables()