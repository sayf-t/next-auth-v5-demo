import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL });
  const adapter = new PrismaNeon(neon);
  return new PrismaClient({ adapter });
};
declare global {
    var prisma: PrismaClient | ReturnType<typeof prismaClientSingleton>;
}

// globalThis is a new global object in JavaScript that is available in all environments.
export const db = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}