import { PrismaClient } from "@prisma/client";
import { queryGPT } from "../dist"

const prisma = new PrismaClient().$extends(queryGPT({}))

async function main() {
  try {
    const user = await prisma.user.upsert({
      where: { email: "alig@tor.com" },
      update: {},
      create: {
        name: "Ali Yeysides",
        email: "alig@tor.com",
        posts: {
          create: [{
            title: "Hello World",
            content: "This is my first post",
            published: true,
            updatedAt: new Date(),
          },
          {
            title: "Hello World 2",
            content: "This is my second post",
            published: false,
            updatedAt: new Date(),
          },
          ]
        },
      }
    })

    console.log({ user });
    const res = await prisma.$queryGPT("return all unpublished posts but exclude the author's email")
    console.log({ res })
  } catch (e) {
    console.log(e)
  }
}

main()
