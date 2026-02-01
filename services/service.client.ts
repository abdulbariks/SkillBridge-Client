"use client"; 

import { env } from "@/env";

const API_URL = env.API_URL;

interface CreateCategoryParams {
  name: string;
}

interface ServiceResponse<T = any> {
  data: T | null;
  error: { message: string } | null;
}

export const clientService = {
  createCategory: async (
    params: CreateCategoryParams
  ): Promise<ServiceResponse> => {
    try {
      const res = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const data = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: data?.message || "Failed" } };
      }

      return { data, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
