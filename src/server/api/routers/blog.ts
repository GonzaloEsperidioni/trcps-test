import { z } from "zod";

import {
  createTRPCRouter,
  // loggedProcedure,
  loggerMiddleware,
  publicProcedure,
} from "../trpc";

export const blogRouters = createTRPCRouter({
  algoDeBlog: publicProcedure
    .use(loggerMiddleware)
    .input(z.object({ title: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.title}`,
        fecha: new Date(),
      };
    }),
  andy: publicProcedure
    .input(z.object({ name: z.string(), edad: z.number().optional() }))
    .query(({ input }) => {
      return {
        message: `Hola soy ${input.name} y tengo ${input.edad || 0}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
