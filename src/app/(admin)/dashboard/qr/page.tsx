"use client";

import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export default function QrCodePage() {
  // Hardcoded list of tables
  const tables = [1, 2, 3, 4, 5, 6, 7, 8];

  // ⚠️ IMPORTANT: Localhost will NOT work on a phone. 
  // You must replace this with your Computer's Local IP (e.g., 192.168.1.5) 
  // or your deployed Vercel domain.
  const baseUrl = "https://the-royal-bistro.vercel/menu/table";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 bg-stone-50 min-h-screen p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-3xl font-serif text-stone-900 font-bold">QR Codes</h1>
          <p className="text-stone-600">Print these for your tables.</p>
        </div>
        <Button
          onClick={handlePrint}
          className="bg-stone-800 hover:bg-stone-900 text-white gap-2"
        >
          <Printer className="h-4 w-4" /> Print All
        </Button>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-6 bg-white rounded-lg border border-stone-200 print:block print:p-0 print:border-none">
        {tables.map((tableId) => (
          <div
            key={tableId}
            className="flex flex-col items-center space-y-4 p-6 border-2 border-dashed border-stone-300 rounded-lg bg-stone-50 
            print:break-inside-avoid print:border-black print:mb-8 print:w-[45%] print:inline-block print:mx-[2%]"
          >
            <h3 className="text-2xl font-bold font-serif text-stone-900">Table {tableId}</h3>

            <div className="bg-white p-2 rounded shadow-sm border border-stone-200">
              <QRCodeSVG
                value={`${baseUrl}/${tableId}`}
                size={150}
                level="H"
                fgColor="#1c1917" // Dark stone color
              />
            </div>

            <p className="text-sm text-stone-500 font-mono uppercase tracking-wider">
              Scan to Order
            </p>
          </div>
        ))}
      </div>

      {/* Standard CSS Style Tag for Print Layout */}
      <style>{`
        @media print {
          @page { margin: 20px; size: auto; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          /* Hide standard layout elements if they exist in your app */
          nav, aside, header, footer { display: none !important; }
        }
      `}</style>
    </div>
  );
}