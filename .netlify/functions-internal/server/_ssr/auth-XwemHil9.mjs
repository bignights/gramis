import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-rzgq_APd.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = reactExports.useState("login");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [info, setInfo] = reactExports.useState(null);
  reactExports.useEffect(() => {
    supabase.auth.getUser().then(({
      data
    }) => {
      if (data.user) navigate({
        to: "/admin"
      });
    });
  }, [navigate]);
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      if (mode === "signup") {
        const {
          error: error2
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`
          }
        });
        if (error2) throw error2;
        setInfo("Account created. You can sign in now.");
        setMode("login");
      } else {
        const {
          error: error2
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error2) throw error2;
        navigate({
          to: "/admin"
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-6", style: {
    backgroundColor: "#080808"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-semibold tracking-tight text-white", children: [
      "Admin ",
      mode === "login" ? "sign in" : "sign up"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/50", children: "Gramis waitlist dashboard" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-6 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), className: "h-11 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#c4b5fd]/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, minLength: 6, placeholder: "Password (min 6 chars)", value: password, onChange: (e) => setPassword(e.target.value), className: "h-11 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#c4b5fd]/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "h-11 w-full rounded-lg bg-[#c4b5fd] text-sm font-semibold text-[#080808] hover:bg-white disabled:opacity-60", children: loading ? "…" : mode === "login" ? "Sign in" : "Create account" })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-red-400", children: error }),
    info && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-[#c4b5fd]", children: info }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
      setMode(mode === "login" ? "signup" : "login");
      setError(null);
      setInfo(null);
    }, className: "mt-6 text-xs text-white/50 hover:text-white", children: mode === "login" ? "Need an account? Sign up" : "Have an account? Sign in" })
  ] }) });
}
export {
  AuthPage as component
};
