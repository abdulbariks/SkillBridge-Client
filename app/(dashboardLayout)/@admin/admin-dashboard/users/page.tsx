import { DataTable } from "@/components/admin- dashboard/users/UserManagementTable";
import {
  columns,
  Payment,
} from "@/components/admin- dashboard/users/UsersTable";
import { userService } from "@/services/user.service";

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ];
// }

export default async function AdminUserManagementPage() {
  // const data = await getData();
  const { data } = await userService.getUsers();

  console.log("====================================");
  console.log(data);
  console.log("====================================");
  return (
    <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min">
      <DataTable columns={columns} data={data.data} />
    </div>
  );
}
