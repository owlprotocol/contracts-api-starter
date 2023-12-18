/**
 * Environment variables. We use a hybrid solution that supports both `import.meta.env` for static
 * replacement used by client bundlers (Vite, Webpack...) and `process.env` for NodeJS libraries.
 * @module Environment
 */
import dotenv from "dotenv";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface ProcessEnv {
            readonly NODE_ENV?: "development" | "production" | "test";
            readonly API_KEY?: string;
            readonly API_URL?: string;
        }
    }
}

const isClient = () => typeof window !== "undefined";

if (!isClient()) {
    dotenv.config();
}

export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const API_KEY = process.env.API_KEY;
export const API_URL = process.env.API_URL ?? "http://localhost:3000";
