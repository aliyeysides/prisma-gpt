import { Prisma } from '@prisma/client/scripts/default-index'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

type Args = {}

export const queryGPT = (_extensionArgs: Args) =>
  Prisma.defineExtension({
    name: "prisma-gpt",
    client: {
      async $queryGPT(str: string) {
        const schema = require("fs").readFileSync("prisma/schema.prisma", 'utf8')
        if (!str) {
          throw new Error("No query string provided")
        }
        if (!schema) {
          throw new Error("No schema provided. Please provide a schema.prisma file in the root of your project")
        }
        const prompt = `
          You are an AI assistant that returns raw sql queries using natural language. 
          You only output raw SQL queries. Never return anything other than raw SQL.
          Always begin the query with SELECT. You will be given the following schema:
           ${schema}
          Take the below query and return raw SQL (Postgres)):
           ${str}
          `
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: "system", content: prompt }],
        })

        if (!response.data.choices) {
          throw new Error("No response from OpenAI")
        }

        const query = response.data.choices[0].message?.content
        console.log('query:', response.data.choices[0])

        if (!query) {
          throw new Error("No query from OpenAI")
        }

        const newLinesAndCarriageReturns = /[\r\n]+/gm
        const trimmed = query.replace(newLinesAndCarriageReturns, "")
        console.log('query trimmed:', trimmed)

        const ctx = Prisma.getExtensionContext(this)

        try {
          const res = await (ctx as any).$queryRawUnsafe(`${trimmed}`)
          return res
        } catch (e) {
          console.log(e)
        }
      },
    },
  })

