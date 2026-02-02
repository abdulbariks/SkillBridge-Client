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



export async function getCategories() {
 const cookieStore = await cookies();
  const res = await fetch("http://localhost:5000/v1/api/categories", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store", // always fresh
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}


export async function getUsers() {
 const cookieStore = await cookies();
  const res = await fetch("http://localhost:5000/v1/api/users", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store", // always fresh
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export async function getBookings() {
 const cookieStore = await cookies();
  const res = await fetch("http://localhost:5000/v1/api/bookings", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store", // always fresh
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export async function getAllTutors() {
  const res = await fetch("http://localhost:5000/v1/api/tutors", {
    headers: {
    },
    cache: "no-store", // always fresh
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}



export async function createReview(data: {
  tutorId: string;
  rating: number;
  comment: string;
}) {
  const cookieStore = await cookies();
  const res = await fetch ("http://localhost:5000/v1/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function createBooking(data: {
  tutorId: string;
  startTime: string;
  endTime: string;
}) {
  const cookieStore = await cookies();
  const res = await fetch ("http://localhost:5000/v1/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(data),
  });

  return res.json();
}