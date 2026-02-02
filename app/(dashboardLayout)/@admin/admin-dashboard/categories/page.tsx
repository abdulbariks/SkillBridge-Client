import { getCategories } from "@/actions/create-category";
import { CreateCategory } from "@/components/admin-dashboard/categories/careateCategory";
import { DataTable } from "@/components/admin-dashboard/categories/CategoryManagemantTable";
import { columns } from "@/components/admin-dashboard/categories/CategoryTable";
import React from "react";
export const dynamic = "force-dynamic";

export default async function AdminCategoriesManagementPage() {
  const categories = await getCategories();
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <DataTable columns={columns} data={categories.data} />
        <CreateCategory />
      </div>
    </div>
  );
}
