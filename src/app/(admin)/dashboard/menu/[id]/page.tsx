import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditMenuForm from "@/components/admin/EditMenuForm"; // We create this next

export default async function EditMenuItemPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;

    // 1. Fetch the existing item
    const item = await prisma.menuItem.findUnique({
        where: { id },
    });

    // 2. If ID is wrong, show 404
    if (!item) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6 pb-12">
            <div className="flex items-center gap-4">
                <a href="/dashboard/menu" className="text-wood-600 hover:text-wood-900">
                    ← Back to Menu
                </a>
                <div>
                    <h1 className="text-3xl font-serif text-wood-900">Edit Item</h1>
                    <p className="text-wood-600">Update details for "{item.name}"</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-wood-200 shadow-sm">
                {/* 3. Pass data to the form */}
                <EditMenuForm item={item} />
            </div>
        </div>
    );
}