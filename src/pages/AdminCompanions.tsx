import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import AdminShell from "@/components/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Save, Plus, Trash2, ExternalLink, QrCode, Download } from "lucide-react";

interface Section {
  type: "text" | "link-list" | "map" | "tip";
  title?: string;
  body?: string;
  mapUrl?: string;
  links?: { label: string; url: string }[];
}

const BASE_URL = "https://www.timelessguides.com";

interface Book { slug: string; title: string; }
interface Companion { id: string; book_slug: string; title: string; intro: string; sections: Section[]; }

function CompanionEditor({ bookSlug, onBack }: { bookSlug: string; onBack: () => void }) {
  const [c, setC] = useState<Companion | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const url = `${BASE_URL}/companion/${bookSlug}`;

  useEffect(() => {
    supabase.from("book_companions").select("*").eq("book_slug", bookSlug).maybeSingle().then(({ data }) => {
      setC(data ? { ...data, sections: Array.isArray(data.sections) ? (data.sections as unknown as Section[]) : [] } : { id: "", book_slug: bookSlug, title: "", intro: "", sections: [] });
      setLoading(false);
    });
    QRCode.toDataURL(url, { width: 512, margin: 2 }).then(setQrDataUrl);
  }, [bookSlug]);

  const save = async () => {
    if (!c) return;
    setSaving(true);
    const payload = { book_slug: c.book_slug, title: c.title, intro: c.intro, sections: c.sections as unknown as any };
    const { error } = c.id
      ? await supabase.from("book_companions").update(payload).eq("id", c.id)
      : await supabase.from("book_companions").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Saved");
  };

  const addSection = (type: Section["type"]) => {
    if (!c) return;
    const base: Section = { type, title: "", body: "" };
    if (type === "link-list") base.links = [{ label: "", url: "" }];
    setC({ ...c, sections: [...c.sections, base] });
  };

  const updateSection = (i: number, patch: Partial<Section>) => {
    if (!c) return;
    const n = [...c.sections];
    n[i] = { ...n[i], ...patch };
    setC({ ...c, sections: n });
  };

  const removeSection = (i: number) => {
    if (!c) return;
    setC({ ...c, sections: c.sections.filter((_, j) => j !== i) });
  };

  if (loading || !c) return <AdminShell title="Companion"><Loader2 className="w-6 h-6 animate-spin" /></AdminShell>;

  return (
    <AdminShell title={`Companion — ${bookSlug}`}>
      <div className="max-w-3xl space-y-6">
        <Button variant="outline" onClick={onBack} className="font-body">← Back to list</Button>

        <div className="border border-border bg-card p-6">
          <div className="flex items-start gap-6">
            {qrDataUrl && <img src={qrDataUrl} alt="QR code" className="w-32 h-32" />}
            <div className="flex-1">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-accent mb-2">Public URL</p>
              <p className="font-mono text-sm mb-4 break-all">{url}</p>
              <div className="flex gap-2">
                <a href={qrDataUrl} download={`qr-${bookSlug}.png`} className="inline-flex items-center gap-2 font-body text-sm border border-border px-4 py-2 hover:bg-muted">
                  <Download className="w-4 h-4" /> Download QR (PNG)
                </a>
                <Link to={`/companion/${bookSlug}`} target="_blank" className="inline-flex items-center gap-2 font-body text-sm border border-border px-4 py-2 hover:bg-muted">
                  <ExternalLink className="w-4 h-4" /> Preview
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-2"><Label>Page title</Label><Input value={c.title} onChange={(e) => setC({ ...c, title: e.target.value })} placeholder="Bonus companion for readers" /></div>
        <div className="grid gap-2"><Label>Intro</Label><Textarea rows={3} value={c.intro} onChange={(e) => setC({ ...c, intro: e.target.value })} /></div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Sections</Label>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={() => addSection("text")}><Plus className="w-3.5 h-3.5 mr-1" />Text</Button>
              <Button variant="outline" size="sm" onClick={() => addSection("tip")}><Plus className="w-3.5 h-3.5 mr-1" />Tip</Button>
              <Button variant="outline" size="sm" onClick={() => addSection("map")}><Plus className="w-3.5 h-3.5 mr-1" />Map</Button>
              <Button variant="outline" size="sm" onClick={() => addSection("link-list")}><Plus className="w-3.5 h-3.5 mr-1" />Links</Button>
            </div>
          </div>

          {c.sections.map((s, i) => (
            <div key={i} className="border border-border p-4 space-y-3 bg-card">
              <div className="flex items-center justify-between">
                <p className="font-body text-xs uppercase tracking-wider text-accent">{s.type}</p>
                <Button variant="ghost" size="sm" onClick={() => removeSection(i)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
              <Input placeholder="Section title" value={s.title || ""} onChange={(e) => updateSection(i, { title: e.target.value })} />
              {(s.type === "text" || s.type === "tip") && (
                <Textarea rows={4} placeholder="Body" value={s.body || ""} onChange={(e) => updateSection(i, { body: e.target.value })} />
              )}
              {s.type === "map" && (
                <>
                  <Textarea rows={2} placeholder="Description" value={s.body || ""} onChange={(e) => updateSection(i, { body: e.target.value })} />
                  <Input placeholder="Map URL (Google Maps, etc.)" value={s.mapUrl || ""} onChange={(e) => updateSection(i, { mapUrl: e.target.value })} />
                </>
              )}
              {s.type === "link-list" && (
                <div className="space-y-2">
                  {(s.links || []).map((l, li) => (
                    <div key={li} className="flex gap-2">
                      <Input placeholder="Label" value={l.label} onChange={(e) => { const links = [...(s.links || [])]; links[li] = { ...l, label: e.target.value }; updateSection(i, { links }); }} />
                      <Input placeholder="https://..." value={l.url} onChange={(e) => { const links = [...(s.links || [])]; links[li] = { ...l, url: e.target.value }; updateSection(i, { links }); }} />
                      <Button variant="ghost" size="sm" onClick={() => updateSection(i, { links: (s.links || []).filter((_, j) => j !== li) })}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => updateSection(i, { links: [...(s.links || []), { label: "", url: "" }] })}><Plus className="w-3.5 h-3.5 mr-1" />Add link</Button>
                </div>
              )}
            </div>
          ))}
        </div>

        <Button onClick={save} disabled={saving} className="font-body uppercase tracking-wider">
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save
        </Button>
      </div>
    </AdminShell>
  );
}

export default function AdminCompanions() {
  const { bookSlug } = useParams<{ bookSlug: string }>();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [existing, setExisting] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookSlug) return;
    Promise.all([
      supabase.from("books").select("slug, title").order("sort_order"),
      supabase.from("book_companions").select("book_slug"),
    ]).then(([b, c]) => {
      setBooks((b.data as Book[]) || []);
      const map: Record<string, boolean> = {};
      (c.data || []).forEach((r: any) => { map[r.book_slug] = true; });
      setExisting(map);
      setLoading(false);
    });
  }, [bookSlug]);

  if (bookSlug) {
    return <CompanionEditor bookSlug={bookSlug} onBack={() => navigate("/admin/companions")} />;
  }

  if (loading) return <AdminShell title="QR Companions"><Loader2 className="w-6 h-6 animate-spin" /></AdminShell>;

  return (
    <AdminShell title="QR Companions">
      <p className="font-body text-muted-foreground mb-6">
        Each book gets a companion page at <code className="bg-muted px-1.5 py-0.5 text-xs">/companion/&lt;book-slug&gt;</code> with a QR code you can print inside the guidebook.
      </p>
      <div className="space-y-3">
        {books.map((b) => (
          <div key={b.slug} className="flex items-center justify-between p-5 border border-border bg-card">
            <div>
              <h3 className="font-heading text-lg">{b.title}</h3>
              <p className="font-body text-xs text-muted-foreground">/companion/{b.slug} · {existing[b.slug] ? "Configured" : "Not set up"}</p>
            </div>
            <Link to={`/admin/companions/${b.slug}`} className="inline-flex items-center gap-2 font-body text-sm border border-border px-4 py-2 hover:bg-muted">
              <QrCode className="w-4 h-4" /> {existing[b.slug] ? "Edit" : "Set up"}
            </Link>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
