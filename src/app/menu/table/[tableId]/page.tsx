import { prisma } from "@/lib/prisma";
import MenuInterface from "@/components/menu/MenuInterface"; // Import the Royal Interface

export default async function MenuPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const tableId = (await params).id;

    // Fetch all menu items
    const menuItems = await prisma.menuItem.findMany({
        orderBy: { category: "asc" },
    });

    // Pass data to the Client Component
    return <MenuInterface initialItems={menuItems} tableId={tableId} />;
}