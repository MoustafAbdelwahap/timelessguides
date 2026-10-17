import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useAdmin } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Save, Eye, Trash2, LogOut, Plus } from "lucide-react";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  is_published: boolean;
  published_at: string | null;
}

export default function AdminJournal() {
  const { isAdmin, loading, user } = useAdmin();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<Post | null>(null);

  const emptyPost: Post = {
    id: "",
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    cover_image_url: "",
    is_published: false,
    published_at: null,
  };

  useEffect(() => {
    if (!isAdmin || loading) return;
    setFetching(true);
    supabase
      .from("posts")
      .select("*")
      .order("updated_at", { ascending: false })
      .then(({ data }) => {
        setPosts(data || []);
        setFetching(false);
      });
  }, [isAdmin, loading]);

  const handleSignIn = async () => {
    const email = prompt("Admin email:");
    if (!email) return;
    const password = prompt("Password:");
    if (!password) return;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast.error(error.message);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSave = async () => {
    const post = selected || emptyPost;
    if (!post.title || !post.slug || !post.excerpt || !post.content) {
      toast.error("Please fill in title, slug, excerpt, and content.");
      return;
    }

    setSaving(true);
    const payload = {
      slug: post.slug.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      cover_image_url: post.cover_image_url || null,
      is_published: post.is_published,
      published_at: post.is_published ? (post.published_at || new Date().toISOString()) : null,
    };

    if (post.id) {
      const { error } = await supabase.from("posts").update(payload).eq("id", post.id);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Post updated");
        setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, ...payload } : p)));
      }
    } else {
      const { data, error } = await supabase.from("posts").insert(payload).select().single();
      if (error) {
        toast.error(error.message);
      } else if (data) {
        toast.success("Post published");
        setPosts((prev) => [data as Post, ...prev]);
        setSelected(data as Post);
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Post deleted");
      setPosts((prev) => prev.filter((p) => p.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SEO title="Admin — Journal" description="Admin journal editor" path="/admin/journal" />
        <Navbar />
        <main className="flex-1 pt-32 pb-20 flex items-center justify-center">
          <div className="text-center max-w-md">
            <h1 className="font-heading text-3xl mb-4">Journal Admin</h1>
            <p className="font-body text-muted-foreground mb-8">
              Sign in to manage your travel journal posts.
            </p>
            <Button onClick={handleSignIn} className="font-body uppercase tracking-wider">
              Sign In
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SEO title="Admin — Journal" description="Admin journal editor" path="/admin/journal" />
        <Navbar />
        <main className="flex-1 pt-32 pb-20 flex items-center justify-center">
          <div className="text-center max-w-md">
            <h1 className="font-heading text-3xl mb-4">Access Required</h1>
            <p className="font-body text-muted-foreground mb-8">
              Your account needs the <strong>admin</strong> role to use the journal editor. Ask the backend owner to add your user role, then refresh.
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

  const editing = selected || emptyPost;

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Admin — Journal" description="Admin journal editor" path="/admin/journal" />
      <Navbar />
      <div className="pt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.3em] text-accent mb-2">Admin</p>
              <h1 className="font-heading text-3xl md:text-4xl">Journal Editor</h1>
            </div>
            <Button onClick={handleSignOut} variant="outline" className="font-body uppercase tracking-wider">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="list" className="font-body">All Posts</TabsTrigger>
              <TabsTrigger value="edit" className="font-body">{selected ? "Edit Post" : "New Post"}</TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              {fetching ? (
                <p className="font-body text-muted-foreground">Loading posts...</p>
              ) : posts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-body text-muted-foreground mb-4">No posts yet.</p>
                  <Button onClick={() => { setSelected(null); }} className="font-body uppercase tracking-wider">
                    <Plus className="w-4 h-4 mr-2" /> Create First Post
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-6 border border-border rounded-sm bg-card"
                    >
                      <div>
                        <h3 className="font-heading text-xl mb-1">{post.title}</h3>
                        <p className="font-body text-sm text-muted-foreground">
                          /journal/{post.slug} · {post.is_published ? "Published" : "Draft"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelected(post)}
                          className="font-body"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="edit">
              <div className="max-w-3xl">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="title" className="font-body">Title</Label>
                    <Input
                      id="title"
                      value={editing.title}
                      onChange={(e) => setSelected({ ...editing, title: e.target.value })}
                      className="font-body"
                      placeholder="e.g., Morning Light on the Bosphorus"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="slug" className="font-body">URL slug</Label>
                    <Input
                      id="slug"
                      value={editing.slug}
                      onChange={(e) => setSelected({ ...editing, slug: e.target.value })}
                      className="font-body"
                      placeholder="bosphorus-morning"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="excerpt" className="font-body">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={editing.excerpt}
                      onChange={(e) => setSelected({ ...editing, excerpt: e.target.value })}
                      className="font-body min-h-[80px]"
                      placeholder="A short preview shown on the journal listing."
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="cover" className="font-body">Cover image URL</Label>
                    <Input
                      id="cover"
                      value={editing.cover_image_url || ""}
                      onChange={(e) => setSelected({ ...editing, cover_image_url: e.target.value })}
                      className="font-body"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="content" className="font-body">Content</Label>
                      <span className="font-body text-xs text-muted-foreground">Paragraphs separated by blank lines</span>
                    </div>
                    <Textarea
                      id="content"
                      value={editing.content}
                      onChange={(e) => setSelected({ ...editing, content: e.target.value })}
                      className="font-body min-h-[400px] leading-relaxed"
                      placeholder="Write your story here..."
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Switch
                      id="published"
                      checked={editing.is_published}
                      onCheckedChange={(checked) => setSelected({ ...editing, is_published: checked })}
                    />
                    <Label htmlFor="published" className="font-body">Publish this post</Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button onClick={handleSave} disabled={saving} className="font-body uppercase tracking-wider">
                      {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                      Save Post
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => selected && navigate(`/journal/${selected.slug}`)}
                      disabled={!selected?.slug}
                      className="font-body uppercase tracking-wider"
                    >
                      <Eye className="w-4 h-4 mr-2" /> Preview
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
}
