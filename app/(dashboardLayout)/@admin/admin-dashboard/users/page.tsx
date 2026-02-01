import { getUsers } from "@/actions/create-category";
import { DataTable } from "@/components/admin-dashboard/users/UsersManagementTable";
import { columns } from "@/components/admin-dashboard/users/UsersTable";
import React from "react";

export default async function AdminUserManagementPage() {
  const users = await getUsers();
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <DataTable columns={columns} data={users.data} />
      </div>
    </div>
  );
}
