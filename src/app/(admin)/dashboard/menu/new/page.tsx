"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// We use the simple UploadButton now (ensure src/lib/uploadthing.ts exports this)
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import { Loader2, ArrowLeft, CheckCircle2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NewMenuItemPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(""); // Stores the URL after upload

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        // Basic validation
        if (!imageUrl) {
            toast.error("Please upload an image first");
            setLoading(false);
            return;
        }

        const data = {
            name: formData.get("name"),
            description: formData.get("description"),
            price: parseFloat(formData.get("price") as string),
            category: formData.get("category"),
            image: imageUrl, // Uses the uploaded image URL
            dietary: [],
        };

        try {
            const res = await fetch("/api/menu", {
                method: "POST",
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error();

            toast.success("Item Created Successfully");
            router.push("/dashboard/menu");
            router.refresh();
        } catch (error) {
            toast.error("Failed to create item");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6 pb-12">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard/menu">
                    <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-serif text-wood-900">New Menu Item</h1>
                    <p className="text-wood-600">Add a delicious new entry to the menu.</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-wood-200 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* --- CUSTOM IMAGE UPLOAD SECTION --- */}
                    <div className="space-y-2">
                        <Label>Item Image</Label>

                        {imageUrl ? (
                            // 1. SUCCESS STATE (Show this if upload worked)
                            <div className="relative w-full h-64 rounded-md overflow-hidden border-2 border-green-500 bg-green-50">

                                {/* The "Done" Message Overlay */}
                                <div className="absolute top-0 left-0 w-full bg-green-500 text-white text-xs font-bold px-3 py-1 flex items-center gap-2 z-10">
                                    <CheckCircle2 className="h-4 w-4" />
                                    IMAGE UPLOADED SUCCESSFULLY
                                </div>

                                <Image
                                    src={imageUrl}
                                    alt="Uploaded Preview"
                                    fill
                                    className="object-cover mt-6"
                                />

                                {/* Remove Button */}
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-8 right-2 h-8 w-8 shadow-lg"
                                    onClick={() => setImageUrl("")} // Resets to allow new upload
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                        ) : (
                            // 2. UPLOAD STATE (With Custom Text & Styling)
                            <div className="border border-wood-200 rounded-lg p-6 bg-wood-50/30 flex flex-col items-center justify-center">
                                <UploadButton
                                    endpoint="imageUploader"
                                    // Customizing the Text
                                    content={{
                                        button: "Upload Image",
                                        allowedContent: "Max 4MB (Images Only)"
                                    }}
                                    // Customizing the Colors
                                    appearance={{
                                        button: "bg-wood-700 text-cream-100 hover:bg-wood-900 px-6 py-2 text-sm font-medium transition-colors",
                                        allowedContent: "text-wood-500 text-xs mt-1"
                                    }}
                                    onClientUploadComplete={(res) => {
                                        console.log("Files: ", res);
                                        if (res && res.length > 0) {
                                            setImageUrl(res[0].url);
                                            toast.success("Upload Completed");
                                        }
                                    }}
                                    onUploadError={(error: Error) => {
                                        toast.error(`ERROR: ${error.message}`);
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Basic Info Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Item Name</Label>
                            <Input id="name" name="name" required placeholder="e.g. Vintage Burger" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Price ($)</Label>
                            <Input id="price" name="price" type="number" step="0.01" required placeholder="0.00" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select name="category" required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
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
                            required
                            placeholder="Describe the ingredients..."
                            className="h-32"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-wood-700 hover:bg-wood-900 text-cream-100 h-12 text-lg"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                        Create Item
                    </Button>
                </form>
            </div>
        </div>
    );
}