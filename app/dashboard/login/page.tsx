"use client";

import { useState } from "react";
import { Lock, Mail, ShieldAlert, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (email === "admin@oasislabs.co" && password === "admin123") {
      document.cookie = "dashboard_auth=true; path=/; max-age=86400";
      window.location.href = "/dashboard";
    } else {
      setTimeout(() => {
        setError("Invalid email or password credentials.");
        setLoading(false);
      }, 600);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      {/* Background Animated Gradient Glow & Glass Blobs */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-chart-2/20 blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      {/* Glassmorphism Container */}
      <div className="relative z-10 w-full max-w-md space-y-8 rounded-3xl border border-white/10 bg-card/40 p-8 shadow-2xl backdrop-blur-2xl transition-all">
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-chart-2 p-0.5 shadow-lg shadow-primary/20">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-card/80 backdrop-blur-md">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-primary/90 to-chart-2 bg-clip-text text-transparent">
              OasisLabs
            </h1>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mt-1">
              Admin Portal Login
            </p>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-xs font-medium text-destructive backdrop-blur-md">
            <ShieldAlert className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@oasislabs.co"
                className="w-full rounded-xl border border-white/10 bg-secondary/30 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 backdrop-blur-md focus:border-primary/50 focus:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-secondary/30 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 backdrop-blur-md focus:border-primary/50 focus:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-chart-2 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-95 disabled:opacity-50"
          >
            <span>{loading ? "Authenticating..." : "Sign In to Dashboard"}</span>
            {!loading && (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            )}
          </button>
        </form>

        <div className="rounded-xl border border-white/10 bg-secondary/20 p-3.5 text-center text-xs text-muted-foreground backdrop-blur-md">
          Demo Admin Credentials: <br />
          <span className="font-mono text-foreground font-semibold">admin@oasislabs.co</span> /{" "}
          <span className="font-mono text-foreground font-semibold">admin123</span>
        </div>
      </div>
    </div>
  );
}
