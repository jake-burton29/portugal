import type { User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

export const reviewRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const reviews = await ctx.prisma.review.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: reviews.map((review) => review.authorId),
        limit: 100,
      })
    ).map(filterUserForClient);

    return reviews.map((review) => {
      const author = users.find((user) => user.id === review.authorId);
      if (!author || !author.firstName)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author for review not found",
        });
      else if (!author.lastName) {
        author.lastName = "";
      }
      return {
        review,
        author: {
          ...author,
          username: author.username,
          firstName: author.firstName,
          lastName: author.lastName,
        },
      };
    });
  }),

  create: privateProcedure
    .input(
      z.object({
        content: z.string().min(1),
        title: z.string().min(1).max(40),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const review = await ctx.prisma.review.create({
        data: {
          authorId,
          title: input.title,
          content: input.content,
        },
      });
      return review;
    }),
});
