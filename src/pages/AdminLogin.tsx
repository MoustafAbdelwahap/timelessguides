import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (() => {
    const next = new URLSearchParams(location.search).get("next");
    if (next && next.startsWith("/") && !next.startsWith("//")) return next;
    return (location.state as { from?: string } | null)?.from || "/admin";
  })();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "forgot">("signin");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate(from, { replace: true });
    });
  }, [navigate, from]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (error) return toast.error(error.message);
    navigate(from, { replace: true });
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Check your inbox for a password reset link.");
    setMode("signin");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO title="Admin Sign In — Timeless Guides" description="Admin sign in" path="/admin/login" noindex />
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-accent mb-3">Admin</p>
            <h1 className="font-heading text-3xl md:text-4xl text-foreground">
              {mode === "signin" ? "Sign in" : "Reset password"}
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-3">
              {mode === "signin"
                ? "Access the Timeless Guides content dashboard."
                : "Enter your email and we'll send you a reset link."}
            </p>
          </div>

          <form onSubmit={mode === "signin" ? handleSignIn : handleForgot} className="space-y-5">
            <div className="grid gap-2">
              <Label htmlFor="email" className="font-body text-xs uppercase tracking-wider">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                autoComplete="email"
              />
            </div>

            {mode === "signin" && (
              <div className="grid gap-2">
                <Label htmlFor="password" className="font-body text-xs uppercase tracking-wider">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                  autoComplete="current-password"
                />
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full h-12 font-body uppercase tracking-wider">
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {mode === "signin" ? "Sign in" : "Send reset link"}
            </Button>

            <div className="text-center pt-2">
              {mode === "signin" ? (
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="font-body text-sm text-muted-foreground hover:text-accent underline underline-offset-4"
                >
                  Forgot password?
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="font-body text-sm text-muted-foreground hover:text-accent underline underline-offset-4"
                >
                  Back to sign in
                </button>
              )}
            </div>
          </form>

          <p className="font-body text-xs text-muted-foreground text-center mt-10">
            <Link to="/" className="hover:text-accent">← Back to site</Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
