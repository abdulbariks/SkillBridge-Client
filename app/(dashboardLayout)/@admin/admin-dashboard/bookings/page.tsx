import { DataTable } from "@/components/admin- dashboard/bookings/BookingsManagementTable";
import {
  columns,
  Payment,
} from "@/components/admin- dashboard/bookings/BookingsTable";
import { bookingService } from "@/services/booking.service";

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       student: "barik",
//       tutor: "abdul",
//       status: "pending",
//     },
//     // ...
//   ];
// }

export default async function AdminBookingManagementPage() {
  // const data = await getData();
  const { data, error } = await bookingService.getBookings(
    {},
    {
      cache: "no-store", // SSR
    },
  );

  console.log("====================================");
  console.log(data);
  console.log("====================================");
  return (
    <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min">
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  );
}
