export {};

declare global {
  namespace Express {
    interface Request {}
  }
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: string;
      DATABASE_URL: string;
      DATABASE_URL_V2: string;
      JWT_SECRET: string;
      JWT_LIFETIME: string;
    }
  }
}
