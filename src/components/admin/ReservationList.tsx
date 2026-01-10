"use client";

import { useState } from "react";
import { Reservation, ReservationStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Calendar, Clock, Phone, Mail, User, Check, Ban, Armchair } from "lucide-react";

// Helper to format dates safely without crashing
const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric"
    });
};

export default function ReservationList({ initialData }: { initialData: Reservation[] }) {
    // Safety check: Ensure initialData is an array
    const [reservations, setReservations] = useState<Reservation[]>(initialData || []);

    const updateStatus = async (id: string, newStatus: ReservationStatus) => {
        // Optimistic UI update
        setReservations((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );

        try {
            const res = await fetch(`/api/reservations/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ status: newStatus }),
            });
            if (!res.ok) throw new Error();
            toast.success(`Marked as ${newStatus}`);
        } catch (error) {
            toast.error("Failed to update");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PENDING": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "CONFIRMED": return "bg-blue-100 text-blue-800 border-blue-200";
            case "SEATED": return "bg-green-100 text-green-800 border-green-200";
            case "CANCELLED": return "bg-red-100 text-red-800 border-red-200";
            default: return "bg-gray-100";
        }
    };

    if (!reservations || reservations.length === 0) {
        return <div className="p-8 text-center text-wood-500">No reservations found.</div>;
    }

    return (
        <div className="divide-y divide-wood-100">
            {reservations.map((res) => (
                <div key={res.id} className="p-6 hover:bg-wood-50/50 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">

                        {/* Info Section */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <h3 className="font-bold text-lg text-wood-900">{res.guestName || "Guest"}</h3>
                                <Badge variant="outline" className={getStatusColor(res.status)}>
                                    {res.status}
                                </Badge>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-wood-600 mt-2">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-wood-400" />
                                    {formatDate(res.date)}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-wood-400" />
                                    {res.time}
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="h-4 w-4 text-wood-400" />
                                    {res.guests} Guests
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-wood-500 mt-1">
                                <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {res.guestPhone}</span>
                                <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {res.guestEmail}</span>
                            </div>
                        </div>

                        {/* Actions Section */}
                        <div className="flex items-center gap-2">
                            {res.status === "PENDING" && (
                                <>
                                    <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50" onClick={() => updateStatus(res.id, "CONFIRMED")}>
                                        <Check className="h-4 w-4 mr-1" /> Confirm
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => updateStatus(res.id, "CANCELLED")}>
                                        <Ban className="h-4 w-4 mr-1" /> Cancel
                                    </Button>
                                </>
                            )}

                            {res.status === "CONFIRMED" && (
                                <Button size="sm" className="bg-wood-700 text-cream-100" onClick={() => updateStatus(res.id, "SEATED")}>
                                    <Armchair className="h-4 w-4 mr-1" /> Mark Seated
                                </Button>
                            )}

                            {res.status === "CANCELLED" && (
                                <span className="text-xs text-red-400 italic">Booking Cancelled</span>
                            )}
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
}