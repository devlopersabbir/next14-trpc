import { publicProcedure, router } from "./trpc";
import { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";

export const appRouter = router({
  index: publicProcedure.query(async () => ["2", "10", "22"]),
  store: publicProcedure
    .input(z.string())
    .mutation((opt) => console.log("op: ", opt.input)),
});

export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
