const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL!

export const userService = {
  getSession: async () => {
    try {
      const res = await fetch(`${AUTH_URL}/api/auth/get-session`, {
        credentials: "include", // include cookies in browser
      });

      console.log('====================================');
      console.log(res);
      console.log('====================================');
      if (!res.ok) return { data: null, error: { message: "No session" } };
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  logout: async () => {
    try {
      const res = await fetch(`${AUTH_URL}/api/auth/sign-out`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        return { success: false, error };
      }
      return { success: true, error: null };
    } catch (err) {
      console.error(err);
      return { success: false, error: { message: "Logout failed" } };
    }
  },
};
