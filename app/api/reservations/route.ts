import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  if (!startDate || !endDate) {
    throw new Error("Invalid Dates");
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation, {
    status: 200,
  });
}

export async function GET(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const reservations = await prisma.reservation.findMany({
    where: {
      userId: currentUser.id,
    },
    include: {
      listing: true,
    },
  });

  return NextResponse.json(reservations, {
    status: 200,
  });
}
