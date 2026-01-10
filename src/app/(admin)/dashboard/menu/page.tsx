import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { revalidatePath } from "next/cache";

export default async function AdminMenuPage() {
    const items = await prisma.menuItem.findMany({
        orderBy: { category: "asc" },
    });

    // Server Action to Delete Item
    async function deleteItem(formData: FormData) {
        "use server";
        const id = formData.get("id") as string;
        await prisma.menuItem.delete({ where: { id } });
        revalidatePath("/dashboard/menu");
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif text-wood-900">Menu Management</h1>
                    <p className="text-wood-600">Update your culinary offerings.</p>
                </div>
                <Link href="/dashboard/menu/new">
                    <Button className="bg-wood-700 hover:bg-wood-900 text-cream-100 gap-2">
                        <Plus className="h-4 w-4" /> Add New Item
                    </Button>
                </Link>
            </div>

            <div className="bg-white border border-wood-200 rounded-md shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-wood-50">
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-wood-500">
                                    No items found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="relative h-12 w-12 rounded overflow-hidden bg-wood-100 border border-wood-200">
                                            {item.image && (
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="48px"
                                                />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-bold text-wood-900">{item.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-xs border-wood-300 text-wood-700">
                                            {item.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex h-2.5 w-2.5 rounded-full ${item.available ? "bg-green-500" : "bg-red-500"}`} />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {/* EDIT BUTTON LINK */}
                                            <Link href={`/dashboard/menu/${item.id}`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-wood-600 hover:text-gold-500 hover:bg-wood-50">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>

                                            {/* DELETE BUTTON FORM */}
                                            <form action={deleteItem}>
                                                <input type="hidden" name="id" value={item.id} />
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}