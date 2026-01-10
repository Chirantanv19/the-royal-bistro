"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { toast } from "sonner";

export default function ReservationForm() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [guests, setGuests] = useState("2");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Reservation Request Sent", {
      description: `Table for ${guests} on ${date ? format(date, 'PPP') : 'selected date'}. Check your email for confirmation.`,
    });
    setLoading(false);
  }

  return (
    <div className="vintage-card bg-white p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Date Picker */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-wood-900">Select Date</label>
          <div className="border border-wood-200 rounded-md p-2 bg-cream-50 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date()}
              className="rounded-md"
            />
          </div>
        </div>

        {/* Guests & Time Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-wood-900">Guests</label>
            <Select defaultValue="2" onValueChange={setGuests}>
              <SelectTrigger>
                <SelectValue placeholder="Select guests" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(num => (
                  <SelectItem key={num} value={num.toString()}>{num} People</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-wood-900">Time</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="18:00">06:00 PM</SelectItem>
                <SelectItem value="19:00">07:00 PM</SelectItem>
                <SelectItem value="20:00">08:00 PM</SelectItem>
                <SelectItem value="21:00">09:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <Input placeholder="Full Name" required className="bg-cream-50" />
          <Input placeholder="Email Address" type="email" required className="bg-cream-50" />
          <Input placeholder="Phone Number" type="tel" className="bg-cream-50" />
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-wood-700 hover:bg-wood-900 text-cream-100 font-serif text-lg h-12"
        >
          {loading ? "Confirming..." : "Confirm Reservation"}
        </Button>
      </form>
    </div>
  );
}