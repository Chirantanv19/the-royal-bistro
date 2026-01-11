import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { tableId, items } = body;

        // Validation
        if (!items || items.length === 0) {
            return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
        }

        console.log(`📝 New Order for Table: ${tableId}`);

        // Calculate Total safely
        const total = items.reduce((sum: number, item: any) => {
            return sum + (item.price * item.quantity);
        }, 0);

        // Create Order in DB
        const order = await prisma.order.create({
            data: {
                tableId: String(tableId), // Forces string format
                total: total,
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

        return NextResponse.json({ success: true, orderId: order.id });

    } catch (error: any) {
        console.error("❌ ORDER FAILED:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}