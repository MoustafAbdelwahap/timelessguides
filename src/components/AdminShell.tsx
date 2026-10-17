import { ReactNode, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, LayoutDashboard, FileText, Map, BookOpen, QrCode, Inbox, Users } from "lucide-react";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/journal", label: "Journal", icon: FileText },
  { to: "/admin/destinations", label: "Destinations", icon: Map },
  { to: "/admin/books", label: "Books", icon: BookOpen },
  { to: "/admin/companions", label: "QR Companions", icon: QrCode },
  { to: "/admin/inbox", label: "Consultations", icon: Inbox },
  { to: "/admin/subscribers", label: "Subscribers", icon: Users },
];

export default function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const { isAdmin, loading, user } = useAdmin();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin/login", { replace: true, state: { from: pathname } });
    }
  }, [loading, user, navigate, pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }



  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SEO title={`Admin — ${title}`} description="Admin dashboard" path="/admin" noindex />
        <Navbar />
        <main className="flex-1 pt-32 pb-20 flex items-center justify-center">
          <div className="text-center max-w-md">
            <h1 className="font-heading text-3xl mb-4">Access Required</h1>
            <p className="font-body text-muted-foreground mb-8">
              Your account needs the <strong>admin</strong> role. Ask the backend owner to grant it, then refresh.
            </p>
            <Button onClick={handleSignOut} variant="outline" className="font-body uppercase tracking-wider">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title={`Admin — ${title}`} description="Admin dashboard" path={pathname} noindex />
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.3em] text-accent mb-2">Admin</p>
              <h1 className="font-heading text-3xl md:text-4xl">{title}</h1>
            </div>
            <Button onClick={handleSignOut} variant="outline" className="font-body uppercase tracking-wider">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </div>

          <div className="grid lg:grid-cols-[220px_1fr] gap-10">
            <aside>
              <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {nav.map((item) => {
                  const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center gap-3 px-4 py-2.5 font-body text-sm rounded-sm whitespace-nowrap transition-colors ${
                        active ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </aside>
            <div>{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
