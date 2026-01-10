import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tableId, items } = body; // items is array of {id, quantity, price}

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items" }, { status: 400 });
    }

    // Create the Order and all OrderItems in one transaction
    const order = await prisma.order.create({
      data: {
        tableId: tableId.toString(),
        status: "RECEIVED",
        total: items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0),
        items: {
          create: items.map((item: any) => ({
            menuItemId: item.id,
            quantity: item.quantity,
            price: item.price, // Store snapshot of price
          })),
        },
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Order Error:", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}