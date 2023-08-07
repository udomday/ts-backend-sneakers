declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      SECRET_KEY: string;
      NODE_ENV: "development" | "production";
    }
  }
}

export {};
