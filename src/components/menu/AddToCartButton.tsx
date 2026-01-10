"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cartStore";
import type { MenuItem } from "@prisma/client";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function AddToCartButton({ item }: { item: MenuItem }) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAdd = () => {
        addItem(item);
        toast.success(`Added ${item.name}`, {
            description: "Item added to your order.",
            position: "bottom-center",
        });
    };

    return (
        <Button
            size="sm"
            onClick={handleAdd}
            className="bg-wood-100 text-wood-900 hover:bg-gold-500 hover:text-wood-900 border border-wood-300"
        >
            <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
    );
}