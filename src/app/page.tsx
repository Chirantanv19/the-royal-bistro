import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, ArrowRight, Coffee, History, Star } from "lucide-react";

// --- ORNAMENTAL DIVIDER (Gold) ---
const OrnamentalDivider = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-4 opacity-60 ${className}`}>
    <div className="h-px bg-gradient-to-r from-transparent via-[#b88a4d] to-transparent w-1/3"></div>
    <div className="w-2 h-2 rotate-45 bg-[#b88a4d]"></div>
    <div className="h-px bg-gradient-to-r from-transparent via-[#b88a4d] to-transparent w-1/3"></div>
  </div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1a1410] text-[#e8d5b5] font-serif selection:bg-[#b88a4d] selection:text-[#2a1d14] overflow-x-hidden">

      {/* --- NAVBAR: Transparent Dark Gradient (No Slab) --- */}
      <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-b from-black/90 via-black/50 to-transparent pb-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between pt-6">

          {/* Left Links */}
          <nav className="hidden md:flex gap-8">
            {['Our Story', 'Menu'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-[#e8d5b5] text-lg font-bold tracking-widest hover:text-[#b88a4d] transition-colors uppercase drop-shadow-md">
                {item}
              </Link>
            ))}
          </nav>

          {/* Center Logo - BIG & CLEAN */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4">
            <div className="relative w-50 h-35 md:w-70 md:h-50 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-500">
              <Image
                src="/royal-logo.png"
                alt="The Royal Bistro"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Links */}
          <div className="flex gap-8 items-center ml-auto md:ml-0">
            <Link href="#find-us" className="hidden md:block text-[#e8d5b5] text-lg font-bold tracking-widest hover:text-[#b88a4d] transition-colors uppercase drop-shadow-md">
              Location
            </Link>
            <Link href="/reservations">
              <Button className="hidden md:block bg-[#b88a4d] hover:bg-[#d4af7a] text-[#2a1d14] font-bold px-8 py-2 rounded-none border border-[#faeacc]/20 shadow-[0_0_15px_rgba(184,138,77,0.4)]">
                BOOK TABLE
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* --- HERO SECTION (Video) --- */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 bg-black">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50">
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          {/* Texture Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/royal.png')] opacity-20"></div>
          {/* Gradient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410] via-transparent to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-8 mt-20">
          <div className="flex items-center justify-center gap-3 text-[#b88a4d] opacity-80 mb-2">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold tracking-[0.4em] uppercase">Est. 1919</span>
            <Star className="w-4 h-4 fill-current" />
          </div>

          <h1 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#faeacc] to-[#b88a4d] drop-shadow-lg leading-tight">
            Taste the Legacy.
          </h1>

          <OrnamentalDivider />

          <p className="text-xl md:text-2xl text-[#faeacc]/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            Culinary perfection handcrafted in a warm, rustic atmosphere steeped in history.
          </p>

          <div className="pt-10 gap-3">
            <Link href="/menu/table/1">
              <Button className="h-14 px-12 text-lg bg-transparent border-2 border-[#b88a4d] text-[#b88a4d] hover:bg-[#b88a4d] hover:text-[#2a1d14] transition-all duration-300 font-bold tracking-widest uppercase rounded-none backdrop-blur-sm">
                View Menu
              </Button>
            </Link>
            <Link href="/reservations">
              <Button className="h-14 px-12 text-lg bg-transparent border-2 border-[#b88a4d] text-[#b88a4d] hover:bg-[#b88a4d] hover:text-[#2a1d14] transition-all duration-300 font-bold tracking-widest uppercase rounded-none backdrop-blur-sm">
                Book Table
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* --- OUR STORY (Restored) --- */}
      <section id="our-story" className="relative py-32 bg-[#261e19] text-[#e8d5b5]">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Frame */}
          <div className="relative h-[500px] w-full border-[8px] border-[#3e2b1f] bg-black shadow-2xl">
            <div className="absolute inset-0 border border-[#b88a4d]/50 m-2 z-20 pointer-events-none"></div>
            <Image
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80"
              alt="Vintage Cafe Interior"
              fill
              className="object-cover opacity-80 sepia-[0.3]"
            />
          </div>

          {/* Text */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-[#b88a4d]">
              <History className="w-6 h-6" />
              <span className="text-sm font-bold tracking-[0.3em] uppercase">Our Heritage</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight text-[#faeacc]">
              Crafted By Time, <br />
              <span className="text-[#b88a4d]">Served With Pride.</span>
            </h2>
            <OrnamentalDivider className="!justify-start opacity-40" />
            <p className="text-xl text-[#e8d5b5]/80 leading-relaxed font-light">
              What started in 1919 as a humble gathering place has blossomed into the city's crown jewel. The Royal Bistro preserves century-old recipes amidst the scent of aged oak and roasted beans.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <span className="block text-4xl font-bold text-[#b88a4d]">100+</span>
                <span className="text-xs text-[#faeacc]/60 uppercase tracking-widest">Years of Service</span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-[#b88a4d]">4.9</span>
                <span className="text-xs text-[#faeacc]/60 uppercase tracking-widest">Michelin Stars</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MENU HIGHLIGHTS (Fixed Broken Image) --- */}
      <section id="menu" className="py-24 bg-[#1a1410] relative border-t border-[#b88a4d]/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Coffee className="w-12 h-12 text-[#b88a4d] mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-[#faeacc] mb-12">Royal Selections</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Signature Roasts",
                img: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&q=80",
                desc: "Dark, rich, and roasted in-house."
              },
              {
                title: "Royal Pastries",
                img: "https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?auto=format&fit=crop&q=80",
                desc: "Decadent cakes baked fresh daily."
              },
              {
                title: "Fine Dining",
                // FIXED IMAGE URL BELOW
                img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80",
                desc: "Exclusive wood-paneled experience."
              }
            ].map((item, i) => (
              <div key={i} className="group relative cursor-pointer overflow-hidden border border-[#b88a4d]/20 rounded-sm bg-[#261e19]">
                <div className="h-72 relative">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                  <h3 className="text-2xl font-bold text-[#faeacc] group-hover:text-[#b88a4d] transition-colors">{item.title}</h3>
                  <p className="text-xs text-[#e8d5b5]/60 mt-1 uppercase tracking-wider">{item.desc}</p>
                  <div className="h-px w-12 bg-[#b88a4d] mt-4 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <Link href="/menu/table/1">
              <Button className="px-12 py-6 bg-transparent border border-[#b88a4d] text-[#b88a4d] hover:bg-[#b88a4d] hover:text-[#1a1410] text-lg uppercase tracking-widest font-bold transition-all">
                Explore Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- LOCATION / MAP (Restored) --- */}
      <section id="find-us" className="grid lg:grid-cols-2 min-h-[500px] border-t border-[#b88a4d]/20">
        <div className="bg-[#15100d] p-12 lg:p-24 flex flex-col justify-center text-[#e8d5b5] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/royal.png')] opacity-5"></div>

          <div className="relative z-10 space-y-8">
            <h3 className="text-[#b88a4d] text-sm font-bold uppercase tracking-[0.3em]">Visit Us</h3>
            <h2 className="text-5xl font-bold text-[#faeacc]">The Royal Estate</h2>
            <OrnamentalDivider className="!justify-start opacity-40" />

            <div className="space-y-6 text-lg font-light">
              <div className="flex gap-6 items-start">
                <MapPin className="text-[#b88a4d] w-6 h-6 shrink-0" />
                <p>123 Heritage Lane, Old Town District,<br />New York, NY 10012</p>
              </div>
              <div className="flex gap-6 items-center">
                <Phone className="text-[#b88a4d] w-6 h-6 shrink-0" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex gap-6 items-start">
                <Clock className="text-[#b88a4d] w-6 h-6 shrink-0" />
                <div>
                  <p><span className="text-[#faeacc] font-bold">Mon-Fri:</span> 8am - 10pm</p>
                  <p><span className="text-[#faeacc] font-bold">Sat-Sun:</span> 9am - 11pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative min-h-[400px] border-l border-[#b88a4d]/20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841261730607!2d-73.9877312845936!3d40.74844057932765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            className="absolute inset-0 w-full h-full grayscale invert-[.9] contrast-[1.1] opacity-80"
            loading="lazy"
          ></iframe>
          <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none"></div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black py-16 text-center border-t border-[#b88a4d]/20">
        <div className="flex flex-col items-center gap-8">
          <div className="relative w-40 h-24 opacity-80 hover:opacity-100 transition-opacity">
            <Image src="/royal-logo.png" alt="Logo" fill className="object-contain" />
          </div>

          <OrnamentalDivider className="opacity-20 w-1/3 mx-auto" />

          <div className="flex gap-6 text-[#b88a4d] text-xs font-bold uppercase tracking-[0.2em]">
            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-white transition-colors">Facebook</Link>
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
          </div>

          <p className="text-[#8c6635] text-xs tracking-[0.3em] uppercase opacity-60">© 2024 The Royal Bistro. Est 1919.</p>
        </div>
      </footer>
    </div>
  );
}