import { PrismaClient } from '../generated/prisma/client.js'
import { withAccelerate } from '@prisma/extension-accelerate'
import 'dotenv/config'

if (!process.env.ACCELERATE_URL) {
  throw new Error('ACCELERATE_URL is missing')
}

export const prisma = new PrismaClient({
  accelerateUrl: process.env.ACCELERATE_URL,
}).$extends(withAccelerate())
