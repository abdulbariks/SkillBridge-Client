import { CreateCategory } from "@/components/admin-dashboard/categories/careateCategory";
import React from "react";

export default function AdminCategoriesManagementPage() {
  return (
    <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min">
      <CreateCategory />
    </div>
  );
}
