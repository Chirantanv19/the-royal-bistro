import { prisma } from "@/lib/prisma";
// We import the component we just created above
import ReservationList from "@/components/admin/ReservationList";

export default async function ReservationsPage() {
  // 1. Fetch data on the server
  const reservations = await prisma.reservation.findMany({
    orderBy: { date: "asc" },
  });

  // 2. Render the page and pass data to the list
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-wood-900">Reservations</h1>
          <p className="text-wood-600">Manage upcoming table bookings.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-wood-200 shadow-sm overflow-hidden">
        <ReservationList initialData={reservations} />
      </div>
    </div>
  );
}