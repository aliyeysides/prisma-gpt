import { PrismaClient } from "@prisma/client";
import { queryGPT } from "../dist"

const prisma = new PrismaClient().$extends(queryGPT({}))

async function main() {
  try {
    const user = await prisma.$queryGPT("hello how are you?")
    console.log({ user })
  } catch (e) {
    console.log(e)
  }
}

main()
