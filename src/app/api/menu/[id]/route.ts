import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const body = await request.json();

    const updatedItem = await prisma.menuItem.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        category: body.category,
        image: body.image,
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}