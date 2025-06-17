import React from "react";
import TableMap3D from "../components/reservation/TableMap3D";
import ReservationForm from "../components/reservation/ReservationForm";

function Reservation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent font-sans flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl md:text-5xl font-serif text-center mb-10 text-primary font-bold drop-shadow">Book a Table</h1>
      <div className="w-full max-w-6xl bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl border border-secondary flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-8">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="rounded-xl overflow-hidden shadow-lg bg-black/90 p-2">
            <TableMap3D />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md">
            <ReservationForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation; 