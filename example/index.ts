import { PrismaClient } from "@prisma/client";
import { queryGPT, listEngines } from "../dist"

const prisma = new PrismaClient().$extends(queryGPT({}))

async function main() {
  const user = prisma.$queryGPT("return all users")
  try {
    await listEngines()
  } catch (e) {
    console.log(e)
  }

  console.log({ user })
}

main()
