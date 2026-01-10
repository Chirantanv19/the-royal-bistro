import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, category, image, dietary } = body;

    const newItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price,
        category,
        image,
        dietary: dietary || [],
        available: true,
      },
    });

    return NextResponse.json(newItem);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}