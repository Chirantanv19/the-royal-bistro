import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export async function PATCH(
    request: Request,
    // 1. Update the type definition
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // 2. AWAIT THE PARAMS (This is the fix)
        const { id } = await params;

        const body = await request.json();
        const { status } = body;

        console.log(`👨‍🍳 Updating Order ID: ${id} to Status: ${status}`);

        // 3. Update in Database
        const updatedOrder = await prisma.order.update({
            where: { id: id },
            data: {
                // Ensure we cast the string to the Enum type
                status: status as OrderStatus
            },
        });

        return NextResponse.json(updatedOrder);

    } catch (error: any) {
        console.error("❌ Update Failed:", error);
        return NextResponse.json(
            { error: "Failed to update order" },
            { status: 500 }
        );
    }
}