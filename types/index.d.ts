import { Mongoose } from "mongoose";

declare global {
  // Fixes the 'cached connection' error in lib/db/index.ts
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };

  // Environment variable types
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      GOOGLE_GEMINI_API_KEY: string;
      TRIGGER_SECRET_KEY: string;
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
      CLERK_SECRET_KEY: string;
      NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY: string;
    }
  }
}

export {};