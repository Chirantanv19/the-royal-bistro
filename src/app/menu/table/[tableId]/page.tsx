import { prisma } from "@/lib/prisma";
import MenuInterface from "@/components/menu/MenuInterface";

export default async function PublicMenuPage({
    params,
}: {
    params: Promise<{ tableId: string }>; // <--- MUST be a Promise
}) {
    const tableId = (await params).tableId; // <--- MUST await it

    const items = await prisma.menuItem.findMany({
        where: { available: true },
        orderBy: { category: "asc" },
    });

    return (
        <div className="min-h-screen bg-wood-50">
            <MenuInterface items={items} tableId={tableId} />
        </div>
    );
}