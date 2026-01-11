import { prisma } from "@/lib/prisma";
import MenuInterface from "@/components/menu/MenuInterface";

// 1. Update the Props Type to be a Promise
interface PageProps {
    params: Promise<{
        tableId: string;
    }>;
}

export default async function MenuPage({ params }: PageProps) {
    // 2. AWAIT the params here (Crucial Next.js 15 Fix)
    const { tableId } = await params;

    console.log("🟢 Loading Menu for Table:", tableId);

    const items = await prisma.menuItem.findMany({
        orderBy: { category: 'asc' }
    });

    return (
        <MenuInterface
            initialItems={items}
            tableId={tableId}
        />
    );
}