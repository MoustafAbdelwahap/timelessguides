import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, Download } from "lucide-react";

interface Sub {
  id: string;
  email: string;
  source: string | null;
  created_at: string;
}

export default function AdminSubscribers() {
  const [rows, setRows] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("subscribers").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setRows((data as Sub[]) || []);
      setLoading(false);
    });
  }, []);

  const exportCsv = () => {
    const header = "email,source,created_at\n";
    const csv = header + rows.map((r) => `"${r.email}","${r.source ?? ""}","${r.created_at}"`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminShell title="Newsletter Subscribers">
      <div className="flex items-center justify-between mb-6">
        <p className="font-body text-muted-foreground">{rows.length} total subscribers</p>
        <Button onClick={exportCsv} className="font-body uppercase tracking-wider"><Download className="w-4 h-4 mr-2" />Export CSV</Button>
      </div>

      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : rows.length === 0 ? (
        <p className="font-body text-muted-foreground">No subscribers yet.</p>
      ) : (
        <div className="border border-border bg-card">
          <table className="w-full text-sm font-body">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Signed up</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-border/50 last:border-0">
                  <td className="px-4 py-3">{r.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.source || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
