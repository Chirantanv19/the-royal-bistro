import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChefHat, UtensilsCrossed, CalendarDays } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-wood-50 flex flex-col">

      {/* Navigation Bar */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="bg-wood-900 p-2 rounded-full">
            <UtensilsCrossed className="h-6 w-6 text-cream-100" />
          </div>
          <span className="text-2xl font-serif font-bold text-wood-900">The Royal Bistro</span>
        </div>
        <div className="flex gap-4">
          <Link href="/reservations">
            <Button variant="ghost" className="text-wood-800 hover:text-wood-900 font-semibold">
              Book a Table
            </Button>
          </Link>
          <Link href="/dashboard/menu">
            <Button variant="outline" className="border-wood-900 text-wood-900 hover:bg-wood-100">
              Admin Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 p-6 max-w-7xl mx-auto w-full">

        {/* Left Text */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-wood-900 leading-tight">
            Taste the <br />
            <span className="text-wood-600">Elegance.</span>
          </h1>
          <p className="text-xl text-wood-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Experience culinary perfection in a warm, royal atmosphere.
            From artisan coffees to gourmet dinners, we serve memories.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/reservations">
              <Button className="bg-wood-900 hover:bg-wood-800 text-cream-100 h-14 px-8 text-lg rounded-full shadow-xl hover:translate-y-[-2px] transition-all">
                Reserve Your Table
              </Button>
            </Link>
            <Link href="/menu/table/1">
              <Button variant="outline" className="h-14 px-8 text-lg rounded-full border-wood-300 text-wood-700 hover:bg-white flex items-center gap-2">
                View Menu <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-wood-500">
            <div className="flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              <span className="text-sm font-medium">Master Chefs</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              <span className="text-sm font-medium">Open 7 Days</span>
            </div>
          </div>
        </div>

        {/* Right Image (Placeholder logic) */}
        <div className="flex-1 relative w-full max-w-lg aspect-square">
          {/* Decorative Circle */}
          <div className="absolute inset-0 bg-wood-200 rounded-full opacity-20 blur-3xl transform translate-x-4 translate-y-4"></div>

          {/* Main Image Container */}
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-500">
            {/* NOTE: If you added a 'hero.jpg' to your public folder, use src="/hero.jpg".
                  For now, I am using a placeholder color so it doesn't look broken.
               */}
            <div className="w-full h-full bg-wood-800 flex items-center justify-center text-cream-100">
              <span className="font-serif text-2xl opacity-50">Image Goes Here</span>
              {/* <Image src="/hero.jpg" alt="Restaurant Interior" fill className="object-cover" /> */}
            </div>
          </div>
        </div>

      </main>

      {/* Simple Footer */}
      <footer className="p-6 text-center text-wood-400 text-sm">
        © 2024 The Royal Bistro. Built with Next.js & Prisma.
      </footer>
    </div>
  );
}