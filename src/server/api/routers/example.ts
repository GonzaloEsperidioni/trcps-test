import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, loggedProcedure, publicProcedure } from "../trpc";

type Algo = {
  id: number;
  title?: string;
  titulo?: string;
  content: string;
};

export const exampleRouter = createTRPCRouter({
  hello: loggedProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  unCambio: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  obtenerPosts: publicProcedure.query<Algo[]>(() => {
    return [
      { id: 1, title: "Hello World", content: "lorem ipsum" },
      { id: 2, titulo: "Post 2", content: "lorem asdas" },
    ];
  }),
  daError: publicProcedure.query(() => {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "No se encontró el recurso",
    });
    return { text: "hola" };
  }),
});
