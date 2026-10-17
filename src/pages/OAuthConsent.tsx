import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// The beta auth.oauth namespace isn't in typings yet — narrow it locally.
type OAuthClient = { name?: string; client_name?: string; redirect_uri?: string; redirect_uris?: string[] };
type AuthorizationDetails = {
  client?: OAuthClient;
  scope?: string;
  scopes?: string[];
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthNs = {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
};
const oauth = (supabase.auth as unknown as { oauth: OAuthNs }).oauth;

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id parameter.");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/admin/login?next=" + encodeURIComponent(next);
        return;
      }
      setUserEmail(sess.session.user.email ?? null);
      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("The authorization server did not return a redirect URL.");
      return;
    }
    window.location.href = target;
  };

  const clientName = details?.client?.client_name ?? details?.client?.name ?? "an application";
  const scopeList = details?.scopes ?? (details?.scope ? details.scope.split(/\s+/).filter(Boolean) : []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO title="Authorize connection — Timeless Guides" description="Approve access to your account" path="/.lovable/oauth/consent" noindex />
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-accent mb-3">Authorize</p>
            <h1 className="font-heading text-3xl md:text-4xl text-foreground">
              Connect {clientName} to your account
            </h1>
            {userEmail && (
              <p className="font-body text-sm text-muted-foreground mt-3">Signed in as {userEmail}</p>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 border border-destructive/40 bg-destructive/5 text-destructive text-sm font-body rounded-sm">
              {error}
            </div>
          )}

          {!details && !error && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-accent" />
            </div>
          )}

          {details && (
            <div className="space-y-6">
              <p className="font-body text-sm text-foreground leading-relaxed">
                {clientName} will be able to call this site's enabled tools while you are signed in.
                This does not bypass Timeless Guides' permissions or backend policies.
              </p>

              {scopeList.length > 0 && (
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">Requested access</p>
                  <ul className="font-body text-sm text-foreground space-y-1">
                    {scopeList.map((s) => (
                      <li key={s}>• {s}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-2">
                <Button
                  onClick={() => decide(true)}
                  disabled={busy}
                  className="h-12 font-body uppercase tracking-wider"
                >
                  {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Approve
                </Button>
                <Button
                  onClick={() => decide(false)}
                  disabled={busy}
                  variant="outline"
                  className="h-12 font-body uppercase tracking-wider"
                >
                  Cancel connection
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
