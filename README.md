# ODPK

Revamping college's website. This is a [Next.js](https://nextjs.org/) version 14 project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Tech stack

- Framework: [Next.js](https://nextjs.org)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- UI Components: [shadcn/ui](https://ui.shadcn.com/)
- Animations: [Framer](https://www.framer.com/motion/)
- Table package: [TanStack/react-table](https://tanstack.com/table/latest)
- Database: [Prisma](https://www.prisma.io/)
- Validation: [Zod](https://zod.dev)
- Caching: [Redis](https://redis.io/)

# Features

- Server-side pagination
- Reusable data-table component
- Authorization implementation via [next-auth](https://next-auth.js.org/)
- Editor component for easy news and pages editing
- Local images storage
- Caching by redis
- Using [FSD architectural methodology](https://feature-sliced.design/)
- Prisma [JSON types generator](https://github.com/arthurfiorette/prisma-json-types-generator)
- Using react-query to manage the state of server data, cache requests, and optimistically update the interface.

# Running locally

1. Clone the repository

   ```bash
   git clone https://github.com/NaotoAzazel/odpk
   ```

2. Install dependencies using npm
   ```bash
   npm install
   ```
3. [Configure](#customizing-env) environment file

4. Usage locally
   ```bash
   npm run dev # run the application in development mode
   npm run build # compile current version of the website
   npm run start # start the website in production mode
   ```

# Useful

I recommend that after making architectural changes, you check that the FSD architectural methodology is correct. The command is already setup.

```bash
npm run steiger # watch once
npm run steiger:watch # watching in real time
```

# Customizing .env

> **Important**: if you add a variable in `.env`, you should also add the same variable in `src/env.js`. All client-side variables should be prefixed with: `NEXT_PUBLIC_`.

First, copy `.env.example` to `.env`.

```bash
cp .env.example .env
```

## Setting

### Database

We will start by setting up our database. You can use any Postgres. Get the variables from your database environment and paste them into `.env`. When you've inserted all the variables associated with the database use the following command.

```bash
npm i -g prisma prisma-json-types-generator
prisma db push
```

> Note: If you are using an environment file called like this: `.env.development` or `.env.production`, then use the following command.

```bash
npm install -g dotenv-cli
dotenv -e .env.[development/production] -- prisma db push
```

### Redis

For Redis we need to get two api keys. Go to [Upstash](https://upstash.com/), create **Redis database**, go to details tab, scroll down to `REST API`, copy `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` and paste them into `.env`.

### Other

The auth variables: `NEXTAUTH_SECRET` can take any value.

> **It is desirable to make this field long and completely random, you can use this [randomkeyget](https://randomkeygen.com/)**.

`NEXTAUTH_URL` insert the same as in `NEXT_PUBLIC_APP_URL`

`NEXT_PUBLIC_APP_URL` in development mode paste your `localhost`, and in production paste the url to your site.

# Static pages

> [!IMPORTANT]
> The link of each page must be unique

After creating the page, you need to correctly specify the path to access it. Lets take a look at two ways.

> [!WARNING]
> The link to the page should be in English only
> There can't be spaces in the link (Space is replaced by "/")

1. Without nesting
   See the image below, we insert `all-documents` and resulting url will look like: http://odpk.ua/content/all-documents

   ![explanation-1](./public/images/explanation-1.png)

2. With nesting
   See the image below, we insert `document/2024/osvitnia-programa-vchiteliv` and resulting url will look like: http://opdk.ua/content/document/2024/osvitnia-programa-vchiteliv. Each `/` symbol means that we make our page more nested each time.

   ![explanation-2](./public/images/explanation-2.png)

# Code styling

Recommend to use the `Prettier` extension, `.prettierrc` file already configured.

# Package versions

- node: v20.16.0
- npm: v10.8.1
