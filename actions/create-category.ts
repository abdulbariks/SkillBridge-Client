"use server";

import { cookies } from "next/headers";


export async function createCategory(data: { name: string }) {
  const cookieStore = await cookies();
  const res = await fetch("http://localhost:5000/v1/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(data),
  });

  return res.json();
}
