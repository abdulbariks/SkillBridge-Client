"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;


export async function createCategory(data: { name: string }) {
  const cookieStore = await cookies();
  const res = await fetch(`${API_URL}/categories`, {
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
  const res = await fetch(`${API_URL}/categories`, {
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
  const res = await fetch(`${API_URL}/users`, {
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
  const res = await fetch(`${API_URL}/bookings`, {
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
  const res = await fetch(`${API_URL}/tutors`, {
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
  const res = await fetch(`${API_URL}/reviews`, {
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
  const res = await fetch(`${API_URL}/bookings`, {
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
  const res = await fetch(`${API_URL}/tutors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(data),
  });

  return res.json();
}





