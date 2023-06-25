# Prisma-GPT is a prisma client extension that lets you write db queries using natural language. 

### Run example after cloning this repo
```ts
npm install
npm run build
cd example/
npm install
npm run dev
```

You can update the schema in the example and try querying for your new entity. Prisma-GPT will read `schema.prisma` file in your root directory if there is one and interpolate it into the prompt as additional context in order to prevent table name hallucinations.
