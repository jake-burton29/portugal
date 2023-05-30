import { z } from "zod";
import { createTRPCRouter, adminProcedure, publicProcedure } from "../trpc";

export const amenitiesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const amenities = await ctx.prisma.amenity.findMany();
    return amenities;
  }),
  create: adminProcedure
    .input(
      z.object({
        content: z.string().min(1),
        title: z.string().min(1).max(40),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const amenity = await ctx.prisma.amenity.create({
        data: {
          imageUrl: "",
          title: input.title,
          content: input.content,
        },
      });
      return amenity;
    }),
});
