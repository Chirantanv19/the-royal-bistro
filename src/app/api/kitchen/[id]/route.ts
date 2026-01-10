import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client"; // ✅ Vital Import

// ✅ This line forces the API to run fresh every time (no caching)
export const dynamic = "force-dynamic";

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
                createdAt: 'asc' // Oldest orders first (FIFO)
            }
        });

        return NextResponse.json(orders);
    } catch (error: any) {
        console.error("❌ KITCHEN API ERROR:", error);
        // Return a JSON error so the frontend check (Array.isArray) catches it safely
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}