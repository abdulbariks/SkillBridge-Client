import { getCategories } from "@/actions/create-category";
import { CreateTutorProfile } from "@/components/commonLayout/CreateTutorProfile";
import React from "react";

export default async function BecomeTutorPage() {
  // const categories = await getCategories();

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* <CreateTutorProfile categories={categories?.data || []} /> */}
      hello
    </div>
  );
}
