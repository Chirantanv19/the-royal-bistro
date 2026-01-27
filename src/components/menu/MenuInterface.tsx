"use client";

import { useState } from "react";
import { MenuItem } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ShoppingBag, Plus, Minus, X } from "lucide-react";


type CartItem = MenuItem & { quantity: number };

export default function MenuInterface({
    initialItems,
    tableId,
}: {
    initialItems: MenuItem[];
    tableId: string;
}) {
    const [activeCategory, setActiveCategory] = useState<string>("ALL");
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const categories = ["ALL", ...Array.from(new Set(initialItems.map((i) => i.category)))];
    const filteredItems = activeCategory === "ALL"
        ? initialItems
        : initialItems.filter((i) => i.category === activeCategory);

    const addToCart = (item: MenuItem) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
            }
            return [...prev, { ...item, quantity: 1 }];
        });
        toast.success("Added to Royal Order");
    };

    const removeFromCart = (itemId: string) => {
        setCart((prev) => prev.filter((i) => i.id !== itemId));
    };

    const submitOrder = async () => {
        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                body: JSON.stringify({ tableId, items: cart }),
            });
            if (!res.ok) throw new Error();
            toast.success("Order Sent to Kitchen!" + tableId);

            setCart([]);
            setIsCartOpen(false);
        } catch {
            toast.error("Failed to place order");
        }
    };

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        // MAIN BACKGROUND: Dark Wood Texture
        <div className="min-h-screen bg-[#1a1410] text-[#e8d5b5] font-serif pb-24">

            {/* HEADER */}
            <div className="sticky top-0 z-40 bg-[#1a1410]/95 backdrop-blur-md border-b border-[#b88a4d]/30 shadow-2xl">
                <div className="px-6 py-4 flex justify-between items-center">
                    {/* Logo Small */}
                    <div className="relative w-12 h-12">
                        <Image src="/royal-logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-[#faeacc] font-bold text-lg tracking-widest uppercase">Table {tableId}</h1>
                        <p className="text-[#b88a4d] text-xs italic">Royal Service</p>
                    </div>
                    {/* Cart Icon */}
                    <div className="relative" onClick={() => setIsCartOpen(true)}>
                        <ShoppingBag className="w-7 h-7 text-[#b88a4d]" />
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {cart.length}
                            </span>
                        )}
                    </div>
                </div>

                {/* CATEGORY TABS (Gold Scroll) */}
                <div className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`whitespace-nowrap px-6 py-2 text-sm font-bold tracking-widest uppercase transition-all border ${activeCategory === cat
                                ? "bg-[#b88a4d] text-[#1a1410] border-[#b88a4d]"
                                : "bg-transparent text-[#b88a4d] border-[#b88a4d]/30"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* MENU ITEMS GRID */}
            <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => (
                    <div key={item.id} className="group relative bg-[#261e19] border border-[#b88a4d]/20 rounded-sm overflow-hidden flex flex-col shadow-lg">

                        {/* Item Image */}
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image
                                src={item.image || "/placeholder.jpg"}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#261e19] to-transparent opacity-80"></div>

                            {/* Price Tag */}
                            <div className="absolute bottom-3 right-3 bg-[#1a1410] border border-[#b88a4d] px-3 py-1 text-[#b88a4d] font-bold">
                                ${item.price.toFixed(2)}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-[#faeacc] mb-2">{item.name}</h3>
                                <p className="text-[#b88a4d]/70 text-sm leading-relaxed mb-4 font-sans font-light">{item.description}</p>
                                {item.dietary.length > 0 && (
                                    <div className="flex gap-2 mb-4">
                                        {item.dietary.map((tag) => (
                                            <Badge key={tag} variant="outline" className="text-[10px] border-[#b88a4d]/40 text-[#b88a4d]">{tag}</Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Button
                                onClick={() => addToCart(item)}
                                className="w-full bg-transparent border border-[#b88a4d] text-[#b88a4d] hover:bg-[#b88a4d] hover:text-[#1a1410] font-bold tracking-widest uppercase rounded-sm transition-all"
                            >
                                Add to Order
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* FLOATING CART SUMMARY (Bottom) */}
            {cart.length > 0 && !isCartOpen && (
                <div className="fixed bottom-6 left-6 right-6 z-40">
                    <Button
                        onClick={() => setIsCartOpen(true)}
                        className="w-full h-14 bg-[#b88a4d] text-[#1a1410] font-bold text-lg shadow-[0_0_20px_rgba(184,138,77,0.5)] rounded-sm flex justify-between px-6 border border-[#faeacc]/30"
                    >
                        <span>{cart.length} Items</span>
                        <span>View Order (${totalAmount.toFixed(2)})</span>
                    </Button>
                </div>
            )}

            {/* CART OVERLAY / MODAL */}
            {isCartOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
                    <div className="w-full max-w-md bg-[#1a1410] h-full border-l border-[#b88a4d]/30 flex flex-col">

                        {/* Cart Header */}
                        <div className="p-6 border-b border-[#b88a4d]/20 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-[#faeacc]">Your Order</h2>
                            <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)} className="text-[#b88a4d]">
                                <X className="w-6 h-6" />
                            </Button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4 items-center bg-[#261e19] p-3 border border-[#b88a4d]/10 rounded-sm">
                                    <div className="relative w-16 h-16 bg-black">
                                        <Image src={item.image || ""} alt="" fill className="object-cover opacity-80" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-[#faeacc]">{item.name}</h4>
                                        <p className="text-[#b88a4d] text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[#faeacc] font-bold">x{item.quantity}</span>
                                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-red-500/70 hover:text-red-500 h-8 w-8">
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {cart.length === 0 && <p className="text-center text-[#b88a4d]/50 mt-10">Your royal table is empty.</p>}
                        </div>

                        {/* Cart Footer */}
                        <div className="p-6 bg-[#261e19] border-t border-[#b88a4d]/20 space-y-4">
                            <div className="flex justify-between text-xl font-bold text-[#faeacc]">
                                <span>Total</span>
                                <span>${totalAmount.toFixed(2)}</span>
                            </div>
                            <Button
                                onClick={submitOrder}
                                disabled={cart.length === 0}
                                className="w-full h-14 bg-[#b88a4d] hover:bg-[#d4af7a] text-[#1a1410] font-bold text-lg rounded-sm"
                            >
                                Place Order
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}