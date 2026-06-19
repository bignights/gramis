import { c as createMiddleware, b as getRequest } from "./server-DR3079Rj.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
const requireSupabaseAuth = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const SUPABASE_URL = "https://hqgfxwbvposujboxjlei.supabase.co";
    const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZ2Z4d2J2cG9zdWpib3hqbGVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3NjM3MDYsImV4cCI6MjA5NzMzOTcwNn0.idtoQ1dzrMotwETrLpB9baPHEIVOimtd7YSWruYNoHY";
    const request = getRequest();
    if (!request?.headers) {
      throw new Error("Unauthorized: No request headers available");
    }
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      throw new Error("Unauthorized: No authorization header provided");
    }
    if (!authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized: Only Bearer tokens are supported");
    }
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      throw new Error("Unauthorized: No token provided");
    }
    const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      auth: {
        storage: void 0,
        persistSession: false,
        autoRefreshToken: false
      }
    });
    const { data, error } = await supabase.auth.getClaims(token);
    if (error || !data?.claims) {
      throw new Error("Unauthorized: Invalid token");
    }
    if (!data.claims.sub) {
      throw new Error("Unauthorized: No user ID found in token");
    }
    return next({
      context: {
        supabase,
        userId: data.claims.sub,
        claims: data.claims
      }
    });
  }
);
export {
  requireSupabaseAuth as r
};
