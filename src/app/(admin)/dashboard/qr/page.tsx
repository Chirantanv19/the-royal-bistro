"use client";

import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export default function QrCodePage() {
  // We will generate codes for Tables 1-8
  const tables = [1, 2, 3, 4, 5, 6, 7, 8];
  
  // This is where the QR code points to. 
  // In production, change this to your actual website domain.
  const baseUrl = "http://localhost:3000/menu/table";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-3xl font-serif text-wood-900">QR Codes</h1>
          <p className="text-wood-600">Print these for your tables.</p>
        </div>
        <Button onClick={handlePrint} className="bg-wood-700 text-cream-100 gap-2">
          <Printer className="h-4 w-4" /> Print All
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-4 bg-white rounded-lg border border-wood-200 print:border-none print:shadow-none print:block">
        {tables.map((tableId) => (
          <div 
            key={tableId} 
            className="flex flex-col items-center space-y-4 p-6 border-2 border-dashed border-wood-200 rounded-lg bg-wood-50 print:break-inside-avoid print:border-black print:mb-8 print:w-[45%] print:inline-block print:mx-[2%]"
          >
            <h3 className="text-xl font-bold font-serif text-wood-900">Table {tableId}</h3>
            
            <div className="bg-white p-2 rounded shadow-sm">
              <QRCodeSVG 
                value={`${baseUrl}/${tableId}`} 
                size={150}
                level="H" // High error correction
                fgColor="#2C1810" // Dark Wood color for the code
              />
            </div>

            <p className="text-xs text-wood-500 font-mono">
              Scan to Order
            </p>
          </div>
        ))}
      </div>
      
      {/* Print Styling Helper */}
      <style jsx global>{`
        @media print {
          @page { margin: 20px; }
          body { -webkit-print-color-adjust: exact; }
          nav, aside, header { display: none !important; }
        }
      `}</style>
    </div>
  );
}