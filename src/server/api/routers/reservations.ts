import { createTRPCRouter, publicProcedure } from "../trpc";

export const reservationsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const reservations = await ctx.prisma.reservation.findMany();
    return reservations;
  }),
});
