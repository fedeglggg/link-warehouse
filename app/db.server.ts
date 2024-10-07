import { PrismaClient } from "@prisma/client";

declare global {
  // Allow global `var` declarations
  // eslint-disable-next-line no-var
  var __db__: PrismaClient | undefined;
}

let db: PrismaClient;

if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  if (!global.__db__) {
    global.__db__ = new PrismaClient();
  }
  db = global.__db__;
}

export default db;
