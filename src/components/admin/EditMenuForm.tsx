"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import type { MenuItem } from "@prisma/client";

export default function EditMenuForm({ item }: { item: MenuItem }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(item.image || ""); // Start with existing image

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            description: formData.get("description"),
            price: parseFloat(formData.get("price") as string),
            category: formData.get("category"),
            image: imageUrl, // Uses the updated or original image
        };

        try {
            // Send PATCH request to update specific ID
            const res = await fetch(`/api/menu/${item.id}`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error();

            toast.success("Item Updated Successfully");
            router.push("/dashboard/menu");
            router.refresh();
        } catch (error) {
            toast.error("Failed to update item");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* IMAGE SECTION */}
            <div className="space-y-2">
                <Label>Item Image</Label>
                {imageUrl ? (
                    <div className="relative w-full h-64 rounded-md overflow-hidden border border-wood-200">
                        <Image src={imageUrl} alt="Preview" fill className="object-cover" />

                        {/* Remove/Replace Button */}
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 shadow-lg z-10"
                            onClick={() => setImageUrl("")}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="border border-wood-200 rounded-lg p-6 bg-wood-50/30 flex flex-col items-center justify-center">
                        <UploadButton
                            endpoint="imageUploader"
                            content={{ button: "Upload New Image" }}
                            appearance={{
                                button: "bg-wood-700 text-cream-100 hover:bg-wood-900 px-6 py-2 text-sm",
                            }}
                            onClientUploadComplete={(res) => {
                                if (res && res.length > 0) {
                                    setImageUrl(res[0].url);
                                    toast.success("New Image Ready");
                                }
                            }}
                        />
                    </div>
                )}
            </div>

            {/* TEXT FIELDS (Pre-filled with defaultValue) */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" defaultValue={item.name} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input id="price" name="price" type="number" step="0.01" defaultValue={item.price} required />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={item.category}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="COFFEE">Coffee</SelectItem>
                        <SelectItem value="BREAKFAST">Breakfast</SelectItem>
                        <SelectItem value="LUNCH">Lunch</SelectItem>
                        <SelectItem value="DESSERTS">Desserts</SelectItem>
                        <SelectItem value="BEVERAGES">Beverages</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    defaultValue={item.description}
                    required
                    className="h-32"
                />
            </div>

            <Button type="submit" className="w-full bg-wood-700 hover:bg-wood-900 text-cream-100 h-12" disabled={loading}>
                {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                Save Changes
            </Button>
        </form>
    );
}