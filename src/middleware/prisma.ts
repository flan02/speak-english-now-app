/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
// const prisma = new PrismaClient();
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Middleware con $extends para limpiar nulos en create/update
const extendedPrisma = prisma.$extends({
  query: {
    $allModels: {
      create({ args, query }: { args: any; query: any }) {
        args.data = Object.fromEntries(
          Object.entries(args.data).filter(([_, v]) => v != null)
        );
        return query(args);
      },
      update({ args, query }) {
        args.data = Object.fromEntries(
          Object.entries(args.data).filter(([_, v]) => v != null)
        );
        return query(args);
      },
    },
  },
});

export default extendedPrisma;








