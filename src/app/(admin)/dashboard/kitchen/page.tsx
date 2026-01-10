"use client";

import { useEffect, useState } from "react";
import { OrderStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ChefHat, Clock, Flame } from "lucide-react";
import { toast } from "sonner";
// We removed date-fns import to make it simpler and dependency-free

type OrderWithItems = {
    id: string;
    tableId: string;
    status: OrderStatus;
    createdAt: Date;
    items: {
        id: string;
        quantity: number;
        menuItem: {
            name: string;
        };
    }[];
};

export default function KitchenPage() {
    const [orders, setOrders] = useState<OrderWithItems[]>([]);
    const [loading, setLoading] = useState(true);

    // 1. Function to Fetch Orders (Safer Version)
    // 1. Function to Fetch Orders
    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/kitchen");

            if (!res.ok) {
                // --- ADD THESE 3 LINES ---
                const errorText = await res.text();
                console.error("🔥 SERVER ERROR DETAILS:", errorText);
                toast.error("Server Error: Check Console");
                // -------------------------
                return;
            }

            const data = await res.json();

            if (Array.isArray(data)) {
                setOrders(data);
            } else {
                setOrders([]);
            }

        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    };

    // 2. Auto-Refresh every 10 seconds
    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 10000);
        return () => clearInterval(interval);
    }, []);

    // 3. Handle Status Updates
    const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
        // Optimistic Update (Update UI instantly before server replies)
        setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );

        try {
            await fetch(`/api/kitchen/${orderId}`, {
                method: "PATCH",
                body: JSON.stringify({ status: newStatus }),
            });
            toast.success(`Order Updated: ${newStatus}`);
            fetchOrders(); // Refresh to be sure
        } catch (error) {
            toast.error("Failed to update status");
            fetchOrders(); // Revert on error
        }
    };

    // Helper to get color based on status
    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case "PENDING": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "IN_PROGRESS": return "bg-blue-100 text-blue-800 border-blue-200";
            case "READY": return "bg-green-100 text-green-800 border-green-200";
            default: return "bg-gray-100";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif text-wood-900 flex items-center gap-3">
                    <ChefHat className="h-8 w-8" /> Kitchen Display
                </h1>
                <Button variant="outline" onClick={fetchOrders}>
                    Refresh Now
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.length === 0 && !loading && (
                    <div className="col-span-full text-center py-20 text-wood-400">
                        <h2 className="text-xl">All clear! No active orders.</h2>
                    </div>
                )}

                {orders.map((order) => (
                    <Card key={order.id} className={`border-2 ${order.status === 'PENDING' ? 'border-yellow-400 shadow-yellow-100' : 'border-wood-200'}`}>
                        <CardHeader className="bg-wood-50 pb-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-xl font-bold">Table {order.tableId}</CardTitle>
                                    <p className="text-xs text-wood-500 flex items-center gap-1 mt-1">
                                        <Clock className="h-3 w-3" />
                                        {/* Simple date formatting without external library */}
                                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                                <Badge variant="outline" className={getStatusColor(order.status)}>
                                    {order.status.replace("_", " ")}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            {/* Items List */}
                            <div className="space-y-3 mb-6">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center border-b border-dashed border-wood-100 pb-2 last:border-0">
                                        <span className="font-medium text-wood-800">
                                            {item.quantity}x {item.menuItem.name}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 mt-auto">
                                {order.status === "PENDING" && (
                                    <Button
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2"
                                        onClick={() => updateStatus(order.id, "IN_PROGRESS")}
                                    >
                                        <Flame className="h-4 w-4" /> Start Cooking
                                    </Button>
                                )}

                                {order.status === "IN_PROGRESS" && (
                                    <Button
                                        className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
                                        onClick={() => updateStatus(order.id, "READY")}
                                    >
                                        <CheckCircle2 className="h-4 w-4" /> Mark Ready
                                    </Button>
                                )}

                                {order.status === "READY" && (
                                    <Button
                                        variant="outline"
                                        className="w-full border-wood-300 text-wood-500 hover:bg-wood-100"
                                        onClick={() => updateStatus(order.id, "COMPLETED")}
                                    >
                                        Complete & Clear
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}