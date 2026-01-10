import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/menu/AddToCartButton"; // We will create this next
import CartSheet from "@/components/menu/CartSheet"; // And this

export default async function QRMenuPage({
  params,
}: {
  params: Promise<{ tableId: string }>;
}) {
  const tableId = (await params).tableId;
  
  // In a real app, you would validate if Table ID exists in DB
  // For now, we just assume it's valid to show the menu
  
  const menuItems = await prisma.menuItem.findMany({
    where: { available: true },
    orderBy: { category: 'asc' },
  });

  const categories = Array.from(new Set(menuItems.map((i) => i.category)));

  return (
    <div className="min-h-screen bg-cream-50 pb-24">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-wood-900 text-cream-100 p-4 shadow-md flex justify-between items-center">
        <div>
          <h1 className="font-serif text-lg font-bold">Table #{tableId}</h1>
          <p className="text-xs text-wood-300">Ordering for Royal Bistro</p>
        </div>
        {/* Cart Trigger */}
        <CartSheet tableId={tableId} />
      </header>

      {/* Menu List */}
      <main className="p-4 space-y-8">
        {categories.map((category) => (
          <section key={category} id={category}>
            <h2 className="text-2xl font-serif text-wood-900 mb-4 capitalize border-b-2 border-wood-200 pb-2">
              {category.toLowerCase()}
            </h2>
            
            <div className="space-y-4">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <div key={item.id} className="bg-white p-3 rounded-lg shadow-sm border border-wood-100 flex gap-3">
                    <div className="relative h-24 w-24 shrink-0 rounded-md overflow-hidden bg-wood-100">
                      {item.image && (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      )}
                    </div>
                    
                    <div className="flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-wood-900">{item.name}</h3>
                          <span className="font-serif text-wood-700">${item.price}</span>
                        </div>
                        <p className="text-xs text-wood-500 line-clamp-2">{item.description}</p>
                      </div>
                      
                      <div className="self-end mt-2">
                        {/* Client Component Button */}
                        <AddToCartButton item={item} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}