import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        binanceApiKey: string;
        binanceSecretKey: string;
      };
    }
  }
}

export {};
