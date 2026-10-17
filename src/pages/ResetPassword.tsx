import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase parses the recovery token from the URL hash automatically.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast.error("Password must be at least 8 characters.");
    if (password !== confirm) return toast.error("Passwords do not match.");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated. Signing you in…");
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO title="Reset Password — Timeless Guides" description="Reset your password" path="/reset-password" noindex />
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-accent mb-3">Admin</p>
            <h1 className="font-heading text-3xl md:text-4xl text-foreground">Set a new password</h1>
          </div>

          {!ready ? (
            <p className="font-body text-sm text-muted-foreground text-center">
              Open the reset link from your email to continue. If you already clicked it, this page will unlock in a moment.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-2">
                <Label htmlFor="password" className="font-body text-xs uppercase tracking-wider">New password</Label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="h-12" autoComplete="new-password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm" className="font-body text-xs uppercase tracking-wider">Confirm password</Label>
                <Input id="confirm" type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} className="h-12" autoComplete="new-password" />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-12 font-body uppercase tracking-wider">
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Update password
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
