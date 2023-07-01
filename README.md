# Prisma-GPT
Prisma-GPT is a prisma client extension that lets you query your db using natural language.

### ⚠️ Warning:
Prisma-GPT uses the prisma `$queryRawUnsafe` API which puts users at risk of SQL injection attacks. Prisma-GPT is NOT meant for production.

### Installation
```zsh
npm install prisma-gpt
```

### Add Environment variables
```.env
# .env
DATABASE_URL=
OPENAI_API_KEY=
```

### Usage
```ts
import { queryGPT } from "prisma-gpt"
const xprisma = prisma.$extends(queryGPT({ db: "sqlite", model: "gpt-3.5-turbo" }))

const result = await xprisma.$queryGPT("return all unpublished posts but exclude the email field")
// prisma-gpt-query: SELECT id, createdAt, updatedAt, title, content, published, authorId FROM Post WHERE published = false;
// {
//   res: [
//     {
//       id: 5,
//       createdAt: 2023-06-27T19:32:40.802Z,
//       updatedAt: 2023-06-27T19:32:40.781Z,
//       title: 'Hello World 2',
//       content: 'This is my second post',
//       published: false,
//       authorId: 5
//     }
//   ]
// }
```

### Config
Pass the following optional arguments:
```ts
type Args = {
  db?: string // ex. "postgres", "mysql". default is "sqlite"
  model?: string // ex. "gpt-4". default is "gpt-3.5-turbo"
}
```

### TODO
- [x] Automatically read `schema.prisma` file
- [x] Only allow SQL statements that begin with "SELECT"
- [ ] Add query builder without sql
- [ ] Add support for other dbs
- [ ] Add support for open source LLMs
- [ ] Prisma-gpt cli
- [ ] Prisma-gpt studio

## Testing

### Run example after cloning this repo
```zsh
npm install
npm run build
cd example/
npm install
npx prisma db push
npm run dev
```

You can update the schema in the example and try querying for your new entity. Prisma-GPT will read `schema.prisma` file in your root directory if there is one and interpolate it into the prompt as additional context in order to prevent table name hallucinations.

```ts
const result = await prisma.$queryGPT("return all users")
// gpt output: SELECT * FROM User;
// result: { res: [ { id: 1, email: 'ali@gator.com', name: 'Ali Yeysides' } ] }
```

