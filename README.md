# Prisma-GPT
Prisma-GPT is a prisma client extension that lets you query your db using natural language.

### ⚠️ Warning:
Prisma-GPT uses the prisma `$queryRawUnsafe` API which puts users at risk of SQL injection attacks. Prisma-GPT is NOT meant for production.

### Installation
```zsh
npm install prisma-gpt
```

### Usage
```ts
import { queryGPT } from "prisma-gpt"
const xprisma = prisma.$extends(queryGPT({ db: "sqlite" }))

const result = await xprisma.$queryGPT("return all unpublished posts but exclude the author's email")
```

### TODO
- [x] Automatically read `schema.prisma` file
- [x] Only allow SQL statements that begin with "SELECT"
- [ ] Add support for other dbs
- [ ] Add support for open source LLMs
- [ ] Prisma-GPT CLI
- [ ] Prisma-GPT Studio

## Testing

### Add Environment variables
```.env
# .env
DATABASE_URL=
OPENAI_API_KEY=
```

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

