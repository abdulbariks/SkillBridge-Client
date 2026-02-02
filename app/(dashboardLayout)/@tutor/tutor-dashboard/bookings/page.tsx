import { getBookings } from "@/actions/create-category";
import { DataTable } from "@/components/admin-dashboard/bookings/BookingManagementTable";
import { columns } from "@/components/admin-dashboard/bookings/BookingsTable";
import React from "react";
export const dynamic = "force-dynamic";
export default async function TutorBookingManagementPage() {
  const bookings = await getBookings();
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <DataTable columns={columns} data={bookings.data} />
      </div>
    </div>
  );
}
