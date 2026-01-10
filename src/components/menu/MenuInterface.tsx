"use client";

import { useState } from "react";
import { MenuItem } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CartItem extends MenuItem {
    quantity: number;
}

export default function MenuInterface({
    items,
    tableId
}: {
    items: MenuItem[];
    tableId: string
}) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const router = useRouter();

    const categories = Array.from(new Set(items.map((i) => i.category)));

    function addToCart(item: MenuItem) {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    }

    function removeFromCart(itemId: string) {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === itemId);
            if (existing && existing.quantity > 1) {
                return prev.map((i) =>
                    i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
                );
            }
            return prev.filter((i) => i.id !== itemId);
        });
    }

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // ... imports stay the same

    const [isOrdering, setIsOrdering] = useState(false); // Add this state at the top with your other hooks

    async function handleCheckout() {
        setIsOrdering(true);

        try {
            const response = await fetch("/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tableId: tableId,
                    items: cart
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // This will show the exact database error on your screen
                throw new Error(data.error || "Server Error");
            }

            if (data.success) {
                toast.success("Order Sent to Kitchen! 👨‍🍳");
                setCart([]);
            }

        } catch (error: any) {
            console.error(error);
            // Now the red toast will tell you exactly what is wrong
            toast.error(error.message);
        } finally {
            setIsOrdering(false);
        }
    }

    return (
        <div className="pb-24">
            {/* Header */}
            <div className="bg-wood-900 text-cream-100 p-6 sticky top-0 z-10 shadow-md">
                <h1 className="text-2xl font-serif">Table {tableId}</h1>
                <p className="text-wood-300 text-sm">Select items to order</p>
            </div>

            {/* Menu List */}
            <div className="p-4 space-y-8">
                {categories.map((category) => (
                    <div key={category} id={category}>
                        <h2 className="text-xl font-bold text-wood-800 mb-4 border-b border-wood-200 pb-2">
                            {category}
                        </h2>
                        <div className="space-y-4">
                            {items
                                .filter((item) => item.category === category)
                                .map((item) => {
                                    const inCart = cart.find((i) => i.id === item.id);
                                    return (
                                        <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg shadow-sm border border-wood-100">
                                            {/* Image */}
                                            <div className="relative h-24 w-24 rounded-md overflow-hidden bg-wood-50 flex-shrink-0 border border-wood-100">
                                                {item.image && (
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                )}
                                            </div>

                                            {/* Text */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-bold text-wood-900">{item.name}</h3>
                                                    <p className="text-sm text-wood-500 line-clamp-2">{item.description}</p>
                                                </div>
                                                <div className="flex justify-between items-end mt-2">
                                                    <span className="font-bold text-lg text-wood-900">${item.price.toFixed(2)}</span>

                                                    {/* CONTROLS */}
                                                    {inCart ? (
                                                        <div className="flex items-center gap-3 bg-wood-100 border border-wood-200 rounded-full px-2 py-1 shadow-inner">
                                                            <button onClick={() => removeFromCart(item.id)} className="p-1 rounded-full hover:bg-white text-wood-700 transition-colors">
                                                                <Minus className="h-4 w-4" />
                                                            </button>
                                                            <span className="font-bold text-sm w-4 text-center text-wood-900">{inCart.quantity}</span>
                                                            <button onClick={() => addToCart(item)} className="p-1 rounded-full hover:bg-white text-wood-700 transition-colors">
                                                                <Plus className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        // --- UPDATED WHITE ADD BUTTON ---
                                                        <Button
                                                            size="sm"
                                                            onClick={() => addToCart(item)}
                                                            variant="outline"
                                                            className="bg-white border-wood-300 text-wood-700 hover:bg-wood-50 hover:text-wood-900 h-8 px-6 shadow-sm transition-all"
                                                        >
                                                            Add
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Sticky Bottom Cart Bar */}
            {totalItems > 0 && (
                <div className="fixed bottom-0 left-0 w-full bg-white border-t border-wood-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20">
                    <div className="max-w-md mx-auto flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="text-sm text-wood-500 font-medium">{totalItems} items</span>
                            <span className="text-xl font-bold text-wood-900">${totalAmount.toFixed(2)}</span>
                        </div>
                        <Button
                            onClick={handleCheckout}
                            disabled={isOrdering} // Disable while sending
                            className="bg-green-600 hover:bg-green-700 text-white px-8 h-12 text-lg rounded-full shadow-lg flex items-center gap-2 transition-transform active:scale-95"
                        >
                            {isOrdering ? (
                                "Sending..."
                            ) : (
                                <>
                                    <ShoppingBag className="h-5 w-5" />
                                    Place Order
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}