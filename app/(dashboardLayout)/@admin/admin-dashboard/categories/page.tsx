import { DataTable } from "@/components/admin- dashboard/categories/CategoriesManagementTable";
import {
  columns,
  Payment,
} from "@/components/admin- dashboard/categories/CategoriesTable";
import CreateCategory from "@/components/admin- dashboard/categories/CreateCategory";
import { categoriesService } from "@/services/categories.service";

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       category: "ict",
//     },
//     // ...
//   ];
// }

export default async function AdminCategoriesManagementPage() {
  // const data = await getData();
  const { data } = await categoriesService.getCategories(
    {
      isFeatured: false,
    },
    {
      cache: "no-store",
    },
  );

  console.log("====================================");
  console.log(data);
  console.log("====================================");
  return (
    <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <DataTable columns={columns} data={data.data} />
        <CreateCategory />
      </div>
    </div>
  );
}
