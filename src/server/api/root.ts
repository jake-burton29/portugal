import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { reviewRouter } from "~/server/api/routers/reviews";
import { amenitiesRouter } from "./routers/amenities";
import { reservationsRouter } from "./routers/reservations";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  review: reviewRouter,
  amenity: amenitiesRouter,
  reservation: reservationsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
