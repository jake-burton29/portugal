import { createTRPCRouter, publicProcedure } from "../trpc";

export const amenitiesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const amenities = await ctx.prisma.amenity.findMany();
    return amenities;
  }),
});
