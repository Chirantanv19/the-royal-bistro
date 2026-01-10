import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export async function GET() {
  try {
    // Fetch all orders that are NOT completed or cancelled
    const orders = await prisma.order.findMany({
      where: {
        status: {
          notIn: [OrderStatus.COMPLETED, OrderStatus.CANCELLED]
        }
      },
      include: {
        items: {
          include: {
            menuItem: true // Get the name of the food
          }
        }
      },
      orderBy: {
        createdAt: 'asc' // Oldest orders first
      }
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}