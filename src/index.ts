import { Prisma } from '@prisma/client/scripts/default-index'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const queryFn = async (str: string) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: str }],
  })
  console.log('queryFn:', response.data.choices[0].message)
  return response.data.choices[0].message
}

type Args = {}

export const existsFn = (_extensionArgs: Args) =>
  Prisma.defineExtension({
    name: "prisma-extension-find-or-create",
    model: {
      $allModels: {
        async exists<T, A>(
          this: T,
          args: Prisma.Exact<A, Prisma.Args<T, 'findFirst'>>
        ): Promise<boolean> {

          const ctx = Prisma.getExtensionContext(this)
          const result = await (ctx as any).findFirst(args)
          return result !== null
        },
      },
    },
  })

export const queryGPT = (_extensionArgs: Args) =>
  Prisma.defineExtension({
    name: "prisma-gpt",
    client: {
      $queryGPT: queryFn,
    },
  })
