import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, Check, Mail } from "lucide-react";
import { toast } from "sonner";

interface Req {
  id: string;
  created_at: string;
  name: string;
  email: string;
  offering: string;
  preferred_date: string | null;
  travel_dates: string | null;
  message: string | null;
  status: string;
  handled: boolean;
}

export default function AdminInbox() {
  const [rows, setRows] = useState<Req[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"open" | "all">("open");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("consultation_requests").select("*").order("created_at", { ascending: false });
    setRows((data as unknown as Req[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggleHandled = async (r: Req) => {
    const { error } = await supabase.from("consultation_requests").update({ handled: !r.handled }).eq("id", r.id);
    if (error) return toast.error(error.message);
    setRows((prev) => prev.map((x) => x.id === r.id ? { ...x, handled: !x.handled } : x));
  };

  const visible = rows.filter((r) => filter === "all" ? true : !r.handled);

  return (
    <AdminShell title="Consultation Requests">
      <div className="flex gap-2 mb-6">
        <Button variant={filter === "open" ? "default" : "outline"} size="sm" onClick={() => setFilter("open")}>Open ({rows.filter((r) => !r.handled).length})</Button>
        <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>All ({rows.length})</Button>
      </div>

      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : visible.length === 0 ? (
        <p className="font-body text-muted-foreground">No requests to show.</p>
      ) : (
        <div className="space-y-4">
          {visible.map((r) => (
            <div key={r.id} className={`p-5 border ${r.handled ? "border-border/50 opacity-60" : "border-border"} bg-card`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-heading text-lg">{r.name}</h3>
                  <a href={`mailto:${r.email}`} className="font-body text-sm text-accent hover:underline inline-flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{r.email}</a>
                </div>
                <div className="text-right">
                  <p className="font-body text-xs text-muted-foreground mb-2">{new Date(r.created_at).toLocaleString()}</p>
                  <Button variant={r.handled ? "outline" : "default"} size="sm" onClick={() => toggleHandled(r)}>
                    <Check className="w-3.5 h-3.5 mr-1" />
                    {r.handled ? "Reopen" : "Mark handled"}
                  </Button>
                </div>
              </div>
              {r.offering && <p className="font-body text-sm mb-1"><span className="text-muted-foreground">Offering:</span> {r.offering}</p>}
              {r.preferred_date && <p className="font-body text-sm mb-1"><span className="text-muted-foreground">Preferred date:</span> {r.preferred_date}</p>}
              {r.travel_dates && <p className="font-body text-sm mb-1"><span className="text-muted-foreground">Travel dates:</span> {r.travel_dates}</p>}
              {r.message && <p className="font-body text-sm mt-2 whitespace-pre-wrap">{r.message}</p>}
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
