## tRPC Course

### Let's setup server first

1. Installing required dependency

```console
pnpm add @trpc/client @trpc/server @tanstack/react-query @trpc/react-query
```

**OR**

```console
pnpm add @trpc/server@next @trpc/client@next @trpc/react-query@next @trpc/next@next @tanstack/react-query@latest
```

2. Create a `server` directory and initialize `trpc` and `appRouter`

```ts
// @server/trpc.ts
import { initTRPC } from "@trpc/server";
const t = initTRPC.create();
export const router = t.router;
export const publicProcedure = t.procedure;
```

```ts
// @server/index.ts
import { router, publicProcedure } from "./trpc";
import { inferRouterOutputs } from "@trpc/server";
export const appRouter = router({
  index: publicProcedure.query(async () => ["2", "10", "22"]),
  store: publicProcedure
    .input(z.string())
    .mutation((opt) => console.log("op: ", opt.input)),
});
export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
```

3. Now create api endpoint

```ts
// api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server";
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
  });
export { handler as GET, handler as POST };
```

**It's time to see JSON response from our `API` endpoint**

```console
http://localhost:3000/api/trpc/routename
```

### Client Side setup

1. Create tRPC react client

```ts
// @tRPC/client.ts
import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "@/server";
export const trpc = createTRPCReact<AppRouter>({});
```

2. Setup a provider of `tRPC` with `tenstackQuery`

```ts
// @components/trpcProvider.tsx
"use client";
const queryClient = new QueryClient({});
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    }),
  ],
});
```

3. Server to Client caller

```ts
// @tRPC/serverClient.ts
import { appRouter } from "@/server";
import { httpBatchLink } from "@trpc/client";
import { getBaseUrl } from "./client";
export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});
```
