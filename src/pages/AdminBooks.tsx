import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Save, Plus, Trash2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface Row {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  amazon_url: string;
  meta_title: string;
  meta_description: string;
  description: string;
  details: string[];
  cover_image_url: string | null;
  published: boolean;
  sort_order: number;
}

const empty: Row = {
  id: "", slug: "", title: "", subtitle: "", amazon_url: "",
  meta_title: "", meta_description: "", description: "", details: [""],
  cover_image_url: "", published: true, sort_order: 999,
};

export default function AdminBooks() {
  const [rows, setRows] = useState<Row[]>([]);
  const [selected, setSelected] = useState<Row | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("books").select("*").order("sort_order");
    setRows((data || []).map((r: any) => ({ ...r, details: Array.isArray(r.details) ? r.details : [] })));
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    const r = selected!;
    if (!r.slug || !r.title) return toast.error("Slug and title required");
    setSaving(true);
    const payload = {
      slug: r.slug, title: r.title, subtitle: r.subtitle,
      amazon_url: r.amazon_url, meta_title: r.meta_title,
      meta_description: r.meta_description, description: r.description,
      details: r.details.filter(Boolean), cover_image_url: r.cover_image_url || null,
      published: r.published, sort_order: r.sort_order,
    };
    const { error } = r.id
      ? await supabase.from("books").update(payload).eq("id", r.id)
      : await supabase.from("books").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setSelected(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this book?")) return;
    const { error } = await supabase.from("books").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  if (loading) return <AdminShell title="Books"><Loader2 className="w-6 h-6 animate-spin" /></AdminShell>;

  if (selected) {
    const r = selected;
    return (
      <AdminShell title={r.id ? `Edit ${r.title || "Book"}` : "New Book"}>
        <div className="max-w-3xl space-y-6">
          <Button variant="outline" onClick={() => setSelected(null)} className="font-body">← Back to list</Button>

          <div className="grid gap-2"><Label>Slug</Label><Input value={r.slug} onChange={(e) => setSelected({ ...r, slug: e.target.value })} /></div>
          <div className="grid gap-2"><Label>Title</Label><Input value={r.title} onChange={(e) => setSelected({ ...r, title: e.target.value })} /></div>
          <div className="grid gap-2"><Label>Subtitle</Label><Input value={r.subtitle} onChange={(e) => setSelected({ ...r, subtitle: e.target.value })} /></div>
          <div className="grid gap-2"><Label>Amazon URL</Label><Input value={r.amazon_url} onChange={(e) => setSelected({ ...r, amazon_url: e.target.value })} placeholder="https://www.amazon.com/..." /></div>
          <div className="grid gap-2"><Label>Cover image URL (optional)</Label><Input value={r.cover_image_url || ""} onChange={(e) => setSelected({ ...r, cover_image_url: e.target.value })} placeholder="https://..." /></div>
          <div className="grid gap-2"><Label>Description</Label><Textarea rows={5} value={r.description} onChange={(e) => setSelected({ ...r, description: e.target.value })} /></div>

          <div className="grid gap-2">
            <Label>What's inside (bullet points)</Label>
            {r.details.map((d, i) => (
              <div key={i} className="flex gap-2">
                <Input value={d} onChange={(e) => { const n = [...r.details]; n[i] = e.target.value; setSelected({ ...r, details: n }); }} />
                <Button variant="ghost" size="sm" onClick={() => setSelected({ ...r, details: r.details.filter((_, j) => j !== i) })}><Trash2 className="w-4 h-4" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setSelected({ ...r, details: [...r.details, ""] })}><Plus className="w-4 h-4 mr-1" />Add bullet</Button>
          </div>

          <div className="grid gap-2"><Label>SEO title</Label><Input value={r.meta_title} onChange={(e) => setSelected({ ...r, meta_title: e.target.value })} /></div>
          <div className="grid gap-2"><Label>SEO description</Label><Textarea value={r.meta_description} onChange={(e) => setSelected({ ...r, meta_description: e.target.value })} /></div>
          <div className="grid gap-2"><Label>Sort order</Label><Input type="number" value={r.sort_order} onChange={(e) => setSelected({ ...r, sort_order: parseInt(e.target.value) || 0 })} /></div>

          <div className="flex items-center gap-3">
            <Switch checked={r.published} onCheckedChange={(v) => setSelected({ ...r, published: v })} />
            <Label>Published</Label>
          </div>

          <Button onClick={save} disabled={saving} className="font-body uppercase tracking-wider">
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save
          </Button>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Books">
      <div className="flex justify-end mb-6">
        <Button onClick={() => setSelected({ ...empty })} className="font-body uppercase tracking-wider"><Plus className="w-4 h-4 mr-2" />New book</Button>
      </div>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="flex items-center justify-between p-5 border border-border bg-card">
            <div>
              <h3 className="font-heading text-lg">{r.title}</h3>
              <p className="font-body text-xs text-muted-foreground">/books/{r.slug} · Order {r.sort_order} · {r.published ? "Published" : "Draft"}</p>
            </div>
            <div className="flex gap-2">
              <Link to={`/books/${r.slug}`} target="_blank" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent px-3 py-2"><ExternalLink className="w-3.5 h-3.5" /></Link>
              <Button variant="outline" size="sm" onClick={() => setSelected(r)}>Edit</Button>
              <Button variant="ghost" size="sm" onClick={() => remove(r.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
