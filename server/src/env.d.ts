declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    REDIS_URL: string;
    SENDGRID_API_KEY: string;
  }
}
