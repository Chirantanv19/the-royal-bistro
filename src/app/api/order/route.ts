import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// 1. ADD THIS IMPORT
import { OrderStatus } from "@prisma/client";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { tableId, items } = body;

        console.log("📝 Processing Order for Table:", tableId);

        // Calculate Total
        const total = items.reduce((sum: number, item: any) => {
            return sum + (item.price * item.quantity);
        }, 0);

        // Create Order
        const order = await prisma.order.create({
            data: {
                tableId: String(tableId),
                total: total,
                // 2. USE THE IMPORTED ENUM HERE
                status: OrderStatus.PENDING,
                items: {
                    create: items.map((item: any) => ({
                        menuItemId: item.id,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        });

        console.log("✅ Order Saved:", order.id);
        return NextResponse.json({ success: true, orderId: order.id });

    } catch (error: any) {
        console.error("❌ ORDER FAILED:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}