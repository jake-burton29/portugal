import type { Reservation } from "@prisma/client";

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
};
