import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Check if Supabase is properly configured
export function getSupabaseStatus() {
  const missingVars: string[] = [];

  const isUrlValid = supabaseUrl &&
    supabaseUrl !== "https://placeholder.supabase.co" &&
    supabaseUrl.includes(".supabase.co");

  const isKeyValid = supabaseAnonKey &&
    supabaseAnonKey !== "placeholder-key" &&
    supabaseAnonKey.startsWith("eyJ");

  if (!isUrlValid) missingVars.push("VITE_SUPABASE_URL");
  if (!isKeyValid) missingVars.push("VITE_SUPABASE_ANON_KEY");

  // App redirect URL - where Supabase sends users after OAuth completes
  const appRedirectUrl = typeof window !== "undefined"
    ? `${window.location.origin}/callback`
    : "http://localhost:5173/callback";

  // Supabase callback URL - where Google sends users (Supabase handles token exchange)
  const supabaseCallbackUrl = isUrlValid
    ? `${supabaseUrl}/auth/v1/callback`
    : "https://your-project.supabase.co/auth/v1/callback";

  return {
    configured: isUrlValid && isKeyValid,
    missingVars,
    appRedirectUrl,
    supabaseCallbackUrl,
    supabaseUrl: isUrlValid ? supabaseUrl : null,
  };
}

// Create client with fallback for unconfigured state
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);