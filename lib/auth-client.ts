import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: "https://skill-bridge-server-mu.vercel.app",
  fetchOptions: {
    credentials: "include",
  },
});
