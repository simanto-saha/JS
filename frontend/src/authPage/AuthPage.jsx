import { useState } from "react";

const API_BASE = "http://127.0.0.1:8000/api";

function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: "success"|"error", text }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setMessage(null);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setMessage(null);
    setForm({ username: "", email: "", password: "", password2: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (mode === "register" && form.password !== form.password2) {
      setMessage({ type: "error", text: "Passwords do not match." });
      setLoading(false);
      return;
    }

    const endpoint =
      mode === "login"
        ? `${API_BASE}/auth/login/`
        : `${API_BASE}/auth/register/`;

    const body =
      mode === "login"
        ? { username: form.username, password: form.password }
        : { username: form.username, email: form.email, password: form.password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) localStorage.setItem("token", data.token);
        setMessage({
          type: "success",
          text:
            mode === "login"
              ? "Login successful! Welcome back."
              : "Registration successful! You can now log in.",
        });
        if (mode === "register") {
          setTimeout(() => switchMode("login"), 1500);
        }
      } else {
        const errorMsg =
          data.error ||
          Object.values(data).flat().join(" ") ||
          "Something went wrong.";
        setMessage({ type: "error", text: errorMsg });
      }
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500 mb-4 shadow-lg shadow-emerald-500/30">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">DeliveryApp</h1>
          <p className="text-slate-400 text-sm mt-1">
            {mode === "login" ? "Sign in to your account" : "Create a new account"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          {/* Tab switcher */}
          <div className="flex bg-slate-900/60 rounded-xl p-1 mb-7">
            {["login", "register"].map((tab) => (
              <button
                key={tab}
                onClick={() => switchMode(tab)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  mode === tab
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          {/* Alert */}
          {message && (
            <div className={`mb-5 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 ${
              message.type === "success"
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                : "bg-red-500/15 text-red-400 border border-red-500/25"
            }`}>
              {message.type === "success" ? (
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {message.text}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                className="w-full bg-slate-900/70 border border-slate-600/60 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition"
              />
            </div>

            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-slate-900/70 border border-slate-600/60 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full bg-slate-900/70 border border-slate-600/60 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition"
              />
            </div>

            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirm Password</label>
                <input
                  type="password"
                  name="password2"
                  value={form.password2}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  required
                  className="w-full bg-slate-900/70 border border-slate-600/60 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  {mode === "login" ? "Signing in..." : "Registering..."}
                </>
              ) : mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => switchMode(mode === "login" ? "register" : "login")}
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition"
            >
              {mode === "login" ? "Register" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;