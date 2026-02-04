"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;


export async function createCategory(data: { name: string }) {
  const cookieStore = await cookies();
  const res = await fetch(`${API_URL}/v1/api/categories`, {
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
  const res = await fetch(`${API_URL}/v1/api/categories`, {
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
  const res = await fetch(`${API_URL}/v1/api/users`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store", // always fresh
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export async function getBookings() {
 const cookieStore = await cookies();
  const res = await fetch(`${API_URL}/v1/api/bookings`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store", // always fresh
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return res.json();
}

export async function getAllTutors() {
  const res = await fetch(`${API_URL}/v1/api/tutors`, {
    headers: {
    },
    cache: "no-store", // always fresh
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tutors");
  }

  return res.json();
}



export async function createReview(data: {
  tutorId: string;
  rating: number;
  comment: string;
}) {
  const cookieStore = await cookies();
  const res = await fetch(`${API_URL}/v1/api/reviews`, {
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
  const res = await fetch(`${API_URL}/v1/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(data),
  });

  return res.json();
}
export async function createTutorProfileAction(data: {
  bio?: string;
  hourlyRate: number;
  experience: string;
  categories: { id: string }[];
}) {
  const cookieStore = await cookies();
  const res = await fetch(`${API_URL}/v1/api/tutors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(data),
  });

  return res.json();
}





