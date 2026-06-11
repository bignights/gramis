import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setInfo("Account created. You can sign in now.");
        setMode("login");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ backgroundColor: "#080808" }}
    >
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Admin {mode === "login" ? "sign in" : "sign up"}
        </h1>
        <p className="mt-1 text-sm text-white/50">Gramis waitlist dashboard</p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#c4b5fd]/40"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#c4b5fd]/40"
          />
          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-lg bg-[#c4b5fd] text-sm font-semibold text-[#080808] hover:bg-white disabled:opacity-60"
          >
            {loading ? "…" : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
        {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
        {info && <p className="mt-3 text-xs text-[#c4b5fd]">{info}</p>}
        <button
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError(null);
            setInfo(null);
          }}
          className="mt-6 text-xs text-white/50 hover:text-white"
        >
          {mode === "login" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
