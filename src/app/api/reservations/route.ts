import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Create the reservation
    // Note: guestName/Email/Phone are stored directly if user is not logged in
    const reservation = await prisma.reservation.create({
      data: {
        date: new Date(body.date),
        time: body.time,
        guests: body.guests,
        guestName: body.name,
        guestEmail: body.email,
        guestPhone: body.phone,
        status: "PENDING"
      }
    });

    return NextResponse.json({ success: true, id: reservation.id });

  } catch (error: any) {
    console.error("Booking Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to book table" },
      { status: 500 }
    );
  }
}