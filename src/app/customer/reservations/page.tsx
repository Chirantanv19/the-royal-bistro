import ReservationForm from "@/components/customer/ReservationForm";

export default function ReservationsPage() {
  return (
    <div className="min-h-screen bg-cream-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text */}
        <div className="space-y-6">
          <h1 className="text-5xl font-serif text-wood-900">Book Your Table</h1>
          <p className="text-lg text-wood-700 font-body leading-relaxed">
            Reserve a spot at Royal Bistro for an unforgettable dining experience. 
            For parties larger than 12, please contact us directly.
          </p>
          <div className="p-6 bg-wood-700 text-cream-100 rounded-lg shadow-xl">
            <h3 className="font-bold font-serif text-xl mb-2 text-gold-500">Reservation Policy</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Reservations are held for 15 minutes.</li>
              <li>Smart casual dress code applies.</li>
              <li>Please notify us of any allergies.</li>
            </ul>
          </div>
        </div>

        {/* Right: Form */}
        <ReservationForm />
      </div>
    </div>
  );
}