import { PrismaClient } from "@prisma/client";
import { queryGPT } from "../dist"

const prisma = new PrismaClient().$extends(queryGPT({}))

async function main() {
  try {
    const user = await prisma.user.upsert({
      where: { email: "ali@gator.com" },
      update: {},
      create: {
        name: "Ali Yeysides",
        email: "ali@gator.com",
      },
    });

    console.log({ user });
    const res = await prisma.$queryGPT("return all users")
    console.log({ res })
  } catch (e) {
    console.log(e)
  }
}

main()
