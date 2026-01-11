import Link from "next/link";
import {
  LayoutDashboard,
  UtensilsCrossed,
  CalendarDays,
  QrCode,
  Settings,
  LogOut,
  Store,
  ChefHat
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth"; // ✅ Correct

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-cream-50">
      {/* Sidebar */}
      <aside className="w-64 bg-wood-900 text-cream-100 flex flex-col border-r border-wood-700">
        <div className="p-6 border-b border-wood-700">

          <Link href="/">
            <div className="flex items-center gap-2 text-gold-500 mb-1">
              <Store className="h-6 w-6" />
              <span className="font-serif font-bold tracking-wider">ROYAL ADMIN</span>
            </div>
            <p className="text-xs text-wood-300">Manager Dashboard</p>
          </Link>
        </div>


        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-wood-800 hover:text-gold-500 text-cream-100">
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </Button>
          </Link>
          <Link href="/dashboard/menu">
            <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-wood-800 hover:text-gold-500 text-cream-100">
              <UtensilsCrossed className="h-4 w-4" />
              Menu Management
            </Button>
          </Link>
          <Link href="/dashboard/reservations">
            <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-wood-800 hover:text-gold-500 text-cream-100">
              <CalendarDays className="h-4 w-4" />
              Reservations
            </Button>
          </Link>
          <Link href="/dashboard/qr">
            <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-wood-800 hover:text-gold-500 text-cream-100">
              <QrCode className="h-4 w-4" />
              QR Ordering
            </Button>
          </Link>
          <Link href="/dashboard/kitchen">
            <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-wood-800 hover:text-gold-500 text-cream-100">
              <ChefHat className="h-4 w-4" />
              Kitchen Display
            </Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-wood-800 hover:text-gold-500 text-cream-100">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>

        {/* Functional Sign Out Button with Styles */}
        <div className="p-4 border-t border-wood-700">
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button
              variant="destructive"
              className="w-full justify-start gap-3 bg-red-900/50 hover:bg-red-900 text-red-200"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}