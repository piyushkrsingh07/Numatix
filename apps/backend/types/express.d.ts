import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id:number;
        email: string;
        binanceApiKey: string;
        binanceSecretKey: string;
      };
    }
  }
}

export {};
