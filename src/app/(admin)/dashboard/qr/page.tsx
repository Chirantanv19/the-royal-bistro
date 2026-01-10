import { prisma } from "@/lib/prisma";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

// ✅ HARDCODED LIVE LINK (No environment variables needed)
const APP_URL = "https://the-royal-bistro.vercel.app";

export default async function QRCodesPage() {
  const tables = await prisma.table.findMany({
    orderBy: { number: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-serif text-wood-900">QR Codes</h1>
        <Button
          variant="outline"
          className="border-wood-600 text-wood-900 hover:bg-wood-100 gap-2"
          // Simple print trigger
          onClick={() => {
            'use client';
            window.print(); // Note: This might need a client component wrapper in strict mode, but often works in simple server pages
          }}
        >
          <Printer className="w-4 h-4" /> Print All
        </Button>
      </div>

      <p className="text-wood-600">
        Scan these codes to open the menu for a specific table.
        <br />
        <span className="text-xs font-mono bg-green-100 text-green-800 p-1 rounded">
          Active Link: {APP_URL}
        </span>
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 print:grid-cols-3">
        {tables.map((table) => {
          // Generates: https://the-royal-bistro.vercel.app/menu/table/xyz
          const url = `${APP_URL}/menu/table/${table.id}`;

          return (
            <div
              key={table.id}
              className="flex flex-col items-center p-6 bg-white border-2 border-wood-200 rounded-lg shadow-sm print:border-black print:shadow-none break-inside-avoid"
            >
              <div className="mb-2 text-center">
                <h2 className="text-xl font-bold font-serif text-wood-900">The Royal Bistro</h2>
                <p className="text-sm font-sans uppercase tracking-widest text-gold-600">Table {table.number}</p>
              </div>

              {/* The QR Code */}
              <div className="p-2 bg-white rounded border border-gray-100">
                <QRCodeSVG
                  value={url}
                  size={150}
                  level="H"
                  fgColor="#2c2116"
                />
              </div>

              <div className="mt-4 text-center space-y-1">
                <p className="text-xs text-gray-400 font-mono">Scan to Order</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}