import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

    //   console.log(cookieStore.toString());

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },


getUsers: async function (
  params?: Record<string, string | number | boolean | undefined>,
  options?: ServiceOptions,
) {
  try {
    const url = new URL(`${API_URL}/users`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const config: RequestInit = {};

    if (options?.cache) {
      config.cache = options.cache;
    }

    if (options?.revalidate) {
      config.next = { revalidate: options.revalidate };
    }

    const res = await fetch(url.toString(), config);

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await res.json();

    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: {
        message: "Something went wrong while fetching users",
      },
    };
  }
},

  
};