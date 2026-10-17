import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import FloatingBookingCTA from "@/components/FloatingBookingCTA";
import NotFound from "./NotFound";


interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  published_at: string;
  updated_at: string;
}

export default function JournalPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setPost(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-24">
          <p className="font-body text-muted-foreground">Loading story...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  const truncate = (text: string, max: number) => {
    const clean = text.replace(/\s+/g, " ").trim();
    if (clean.length <= max) return clean;
    const slice = clean.slice(0, max - 1);
    const lastSpace = slice.lastIndexOf(" ");
    return `${slice.slice(0, lastSpace > 0 ? lastSpace : slice.length).trim()}…`;
  };

  const fullTitle = `${post.title} — Timeless Guides Journal`;
  const metaTitle = fullTitle.length <= 60 ? fullTitle : truncate(post.title, 60);
  const metaDescription = truncate(post.excerpt || post.content || post.title, 155);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={metaTitle}
        description={metaDescription}
        path={`/journal/${post.slug}`}
        image={post.cover_image_url || undefined}
        imageAlt={post.title}
        type="article"
        publishedAt={post.published_at}
        updatedAt={post.updated_at}
      />

      <Navbar />
      <FloatingBookingCTA />
      <article className="pt-24">

        <header className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-6 max-w-3xl">
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Journal
            </Link>
            <p className="font-body text-sm uppercase tracking-[0.3em] text-accent mb-4">
              Journal
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground leading-[1.1] mb-6">
              {post.title}
            </h1>
            {post.published_at && (
              <p className="font-body text-sm text-muted-foreground">
                {new Date(post.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        </header>

        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="max-w-2xl mx-auto">
            {post.cover_image_url && (
              <>
                <div className="aspect-[16/9] overflow-hidden mb-12">
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <hr className="border-border/60 mb-12" />
              </>
            )}

            <div className="font-body text-foreground">
              {paragraphs.map((paragraph, i) => (
                <p key={i} className="mb-8 text-lg leading-[1.8]">
                  {paragraph}
                </p>
              ))}
            </div>

            <hr className="border-border/60 mt-16 mb-10" />
            <div className="text-center">
              <Link
                to="/journal"
                className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all stories
              </Link>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
