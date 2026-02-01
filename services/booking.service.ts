import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;

}

interface GetBookingsParams {
  status?: string;
  tutorId?: string;
}

export const bookingService = {
  getBookings: async function (
    params?: GetBookingsParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/bookings`);
      // Query params
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

       const cookieStore = await cookies();
      const config: RequestInit = {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
         Cookie: cookieStore.toString()
        },
      };

      // SSG / SSR / ISR handling
      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: data?.message || "Failed to fetch bookings",
        };
      }

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something went wrong" },
      };
    }
  },
};
