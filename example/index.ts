import { PrismaClient } from "@prisma/client";
import { queryGPT } from "../dist"

const prisma = new PrismaClient().$extends(queryGPT({}))

async function main() {
  try {
    const user = await prisma.$queryGPT("return all users", `model User {
  id    Int    @id @default (autoincrement())
  email String @unique
  name  String

  posts Post[]
  }
`)
    console.log({ user })
  } catch (e) {
    console.log(e)
  }
}

main()
