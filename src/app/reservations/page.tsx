"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar"; // Ensure you have this or use a simple date input
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, CalendarDays, Users, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReservationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    // Simple validation
    if (!date) {
        toast.error("Please select a date");
        setLoading(false);
        return;
    }

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      date: date.toISOString(), // Send date as standard ISO string
      time: formData.get("time"),
      guests: parseInt(formData.get("guests") as string),
    };

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Booking failed");

      toast.success("Table Booked Successfully! We will call to confirm.");
      router.push("/"); // Go back home (we will build Home next)
    } catch (error) {
      toast.error("Could not book table. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-wood-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-wood-200">
        
        {/* Header */}
        <div className="bg-wood-900 p-8 text-center">
          <h1 className="text-3xl font-serif text-cream-100 mb-2">Reserve a Table</h1>
          <p className="text-wood-300">Join us for an unforgettable evening</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Date & Time Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><CalendarDays className="h-4 w-4"/> Date</Label>
              {/* Using native date picker for simplicity. We can upgrade to a fancy Calendar later */}
              <Input 
                type="date" 
                required 
                onChange={(e) => setDate(new Date(e.target.value))}
                className="cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Clock className="h-4 w-4"/> Time</Label>
              <Select name="time" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18:00">6:00 PM</SelectItem>
                  <SelectItem value="18:30">6:30 PM</SelectItem>
                  <SelectItem value="19:00">7:00 PM</SelectItem>
                  <SelectItem value="19:30">7:30 PM</SelectItem>
                  <SelectItem value="20:00">8:00 PM</SelectItem>
                  <SelectItem value="20:30">8:30 PM</SelectItem>
                  <SelectItem value="21:00">9:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
             <Label className="flex items-center gap-2"><Users className="h-4 w-4"/> Guests</Label>
             <Input type="number" name="guests" min="1" max="10" defaultValue="2" required />
          </div>

          <hr className="border-wood-100" />

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input name="name" placeholder="John Doe" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label>Phone</Label>
                <Input name="phone" type="tel" placeholder="+1 234..." required />
                </div>
                <div className="space-y-2">
                <Label>Email</Label>
                <Input name="email" type="email" placeholder="john@example.com" required />
                </div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-wood-700 hover:bg-wood-900 text-cream-100 h-12 text-lg" disabled={loading}>
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Confirm Reservation"}
          </Button>

        </form>
      </div>
    </div>
  );
}