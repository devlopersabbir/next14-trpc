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
