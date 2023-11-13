import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  db: PrismaClientSingleton | undefined
}

const db = globalForPrisma.db ?? prismaClientSingleton()

export default db

if (process.env.NODE_ENV !== 'production') globalForPrisma.db = db