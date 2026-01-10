"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { useState } from "react";
import { toast } from "sonner";

export default function CartSheet({ tableId }: { tableId: string }) {
    const { items, removeItem, total, clearCart } = useCartStore();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    async function placeOrder() {
        if (items.length === 0) return;
        setLoading(true);

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                body: JSON.stringify({ tableId, items }),
            });

            if (!res.ok) throw new Error();

            toast.success("Order Sent to Kitchen!", {
                description: `Table ${tableId}: Your food will be served shortly.`,
            });

            clearCart();
            setOpen(false); // Close the sheet
        } catch (error) {
            toast.error("Failed to place order");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button className="relative bg-gold-500 text-wood-900 hover:bg-gold-400">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    <span>${total().toFixed(2)}</span>
                    {items.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-wood-900">
                            {items.reduce((acc, i) => acc + i.quantity, 0)}
                        </span>
                    )}
                </Button>
            </SheetTrigger>

            <SheetContent className="w-full sm:max-w-md flex flex-col bg-cream-50">
                <SheetHeader>
                    <SheetTitle className="font-serif text-2xl text-wood-900">Your Order (Table {tableId})</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="text-center text-wood-500 mt-10">Your cart is empty.</div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded shadow-sm">
                                <div className="flex gap-3 items-center">
                                    <div className="h-8 w-8 bg-wood-200 rounded flex items-center justify-center font-bold text-wood-700">
                                        {item.quantity}x
                                    </div>
                                    <div>
                                        <p className="font-bold text-wood-900">{item.name}</p>
                                        <p className="text-sm text-wood-500">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))
                    )}
                </div>

                <div className="border-t border-wood-200 pt-4 space-y-4">
                    <div className="flex justify-between text-xl font-bold font-serif text-wood-900">
                        <span>Total</span>
                        <span>${total().toFixed(2)}</span>
                    </div>
                    <Button
                        className="w-full h-12 text-lg font-serif bg-wood-700 text-cream-100 hover:bg-wood-900"
                        disabled={items.length === 0 || loading}
                        onClick={placeOrder}
                    >
                        {loading ? "Sending Order..." : "Place Order"}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}