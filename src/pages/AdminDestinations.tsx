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
  name: string;
  subtitle: string;
  short_description: string;
  meta_title: string;
  meta_description: string;
  intro: string[];
  experiences: { title: string; description: string }[];
  book_slug: string | null;
  hero_image_url: string | null;
  published: boolean;
}

const empty: Row = {
  id: "", slug: "", name: "", subtitle: "", short_description: "",
  meta_title: "", meta_description: "", intro: [""], experiences: [],
  book_slug: "", hero_image_url: "", published: true,
};

export default function AdminDestinations() {
  const [rows, setRows] = useState<Row[]>([]);
  const [selected, setSelected] = useState<Row | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("destinations").select("*").order("created_at");
    setRows((data || []).map((r: any) => ({
      ...r,
      intro: Array.isArray(r.intro) ? r.intro : [],
      experiences: Array.isArray(r.experiences) ? r.experiences : [],
    })));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    const r = selected!;
    if (!r.slug || !r.name) return toast.error("Slug and name required");
    setSaving(true);
    const payload = {
      slug: r.slug, name: r.name, subtitle: r.subtitle,
      short_description: r.short_description, meta_title: r.meta_title,
      meta_description: r.meta_description, intro: r.intro.filter(Boolean),
      experiences: r.experiences.filter((e) => e.title || e.description),
      book_slug: r.book_slug || null, hero_image_url: r.hero_image_url || null,
      published: r.published,
    };
    const { error } = r.id
      ? await supabase.from("destinations").update(payload).eq("id", r.id)
      : await supabase.from("destinations").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setSelected(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this destination?")) return;
    const { error } = await supabase.from("destinations").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  if (loading) return <AdminShell title="Destinations"><Loader2 className="w-6 h-6 animate-spin" /></AdminShell>;

  if (selected) {
    const r = selected;
    return (
      <AdminShell title={r.id ? `Edit ${r.name || "Destination"}` : "New Destination"}>
        <div className="max-w-3xl space-y-6">
          <Button variant="outline" onClick={() => setSelected(null)} className="font-body">← Back to list</Button>

          <div className="grid gap-2"><Label>Slug</Label><Input value={r.slug} onChange={(e) => setSelected({ ...r, slug: e.target.value })} placeholder="rome" /></div>
          <div className="grid gap-2"><Label>Name</Label><Input value={r.name} onChange={(e) => setSelected({ ...r, name: e.target.value })} /></div>
          <div className="grid gap-2"><Label>Subtitle</Label><Input value={r.subtitle} onChange={(e) => setSelected({ ...r, subtitle: e.target.value })} /></div>
          <div className="grid gap-2"><Label>Short description (card teaser)</Label><Textarea value={r.short_description} onChange={(e) => setSelected({ ...r, short_description: e.target.value })} /></div>
          <div className="grid gap-2"><Label>Hero image URL (optional)</Label><Input value={r.hero_image_url || ""} onChange={(e) => setSelected({ ...r, hero_image_url: e.target.value })} placeholder="https://..." /></div>
          <div className="grid gap-2"><Label>Recommended book slug</Label><Input value={r.book_slug || ""} onChange={(e) => setSelected({ ...r, book_slug: e.target.value })} placeholder="food-lovers-travel-guide-to-rome" /></div>

          <div className="grid gap-2">
            <Label>Intro paragraphs</Label>
            {r.intro.map((p, i) => (
              <div key={i} className="flex gap-2">
                <Textarea value={p} onChange={(e) => { const n = [...r.intro]; n[i] = e.target.value; setSelected({ ...r, intro: n }); }} />
                <Button variant="ghost" size="sm" onClick={() => setSelected({ ...r, intro: r.intro.filter((_, j) => j !== i) })}><Trash2 className="w-4 h-4" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setSelected({ ...r, intro: [...r.intro, ""] })}><Plus className="w-4 h-4 mr-1" />Add paragraph</Button>
          </div>

          <div className="grid gap-2">
            <Label>Top Experiences</Label>
            {r.experiences.map((exp, i) => (
              <div key={i} className="border border-border p-3 space-y-2">
                <Input placeholder="Title" value={exp.title} onChange={(e) => { const n = [...r.experiences]; n[i] = { ...exp, title: e.target.value }; setSelected({ ...r, experiences: n }); }} />
                <Textarea placeholder="Description" value={exp.description} onChange={(e) => { const n = [...r.experiences]; n[i] = { ...exp, description: e.target.value }; setSelected({ ...r, experiences: n }); }} />
                <Button variant="ghost" size="sm" onClick={() => setSelected({ ...r, experiences: r.experiences.filter((_, j) => j !== i) })}><Trash2 className="w-4 h-4 mr-1" />Remove</Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setSelected({ ...r, experiences: [...r.experiences, { title: "", description: "" }] })}><Plus className="w-4 h-4 mr-1" />Add experience</Button>
          </div>

          <div className="grid gap-2"><Label>SEO title</Label><Input value={r.meta_title} onChange={(e) => setSelected({ ...r, meta_title: e.target.value })} /></div>
          <div className="grid gap-2"><Label>SEO description</Label><Textarea value={r.meta_description} onChange={(e) => setSelected({ ...r, meta_description: e.target.value })} /></div>

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
    <AdminShell title="Destinations">
      <div className="flex justify-end mb-6">
        <Button onClick={() => setSelected({ ...empty })} className="font-body uppercase tracking-wider"><Plus className="w-4 h-4 mr-2" />New destination</Button>
      </div>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="flex items-center justify-between p-5 border border-border bg-card">
            <div>
              <h3 className="font-heading text-lg">{r.name}</h3>
              <p className="font-body text-xs text-muted-foreground">/destinations/{r.slug} · {r.published ? "Published" : "Draft"}</p>
            </div>
            <div className="flex gap-2">
              <Link to={`/destinations/${r.slug}`} target="_blank" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent px-3 py-2"><ExternalLink className="w-3.5 h-3.5" /></Link>
              <Button variant="outline" size="sm" onClick={() => setSelected(r)}>Edit</Button>
              <Button variant="ghost" size="sm" onClick={() => remove(r.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
