import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ReservationStatus } from "@prisma/client";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const body = await request.json();

    const updated = await prisma.reservation.update({
      where: { id },
      data: { status: body.status as ReservationStatus },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// We also need a DELETE route in case they want to remove a booking entirely
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const id = (await params).id;
      await prisma.reservation.delete({ where: { id } });
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
  }