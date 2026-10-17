import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import FloatingBookingCTA from "@/components/FloatingBookingCTA";
import { Calendar } from "lucide-react";


interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image_url: string | null;
  published_at: string;
}

export default function Journal() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("posts")
      .select("id, slug, title, excerpt, cover_image_url, published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setPosts(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Journal — Timeless Guides"
        description="Slow travel stories, local insights, and timeless wisdom for the modern traveller. Explore the Timeless Guides journal."
        path="/journal"
      />
      <Navbar />
      <FloatingBookingCTA />
      <div className="pt-24">

        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <p className="font-body text-sm uppercase tracking-[0.3em] text-accent mb-4">
              Timeless Guides Journal
            </p>
            <h1 className="font-heading text-4xl md:text-6xl font-semibold text-foreground leading-[1.1] mb-6">
              Stories from the Road
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Slow travel dispatches, local insights, and the kind of wisdom that only comes from wandering with curiosity.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            {loading ? (
              <p className="text-center font-body text-muted-foreground">Loading stories...</p>
            ) : posts.length === 0 ? (
              <div className="text-center max-w-xl mx-auto">
                <p className="font-body text-muted-foreground mb-4">
                  The journal is coming soon. Subscribe to be the first to read new stories.
                </p>
                <a
                  href="/"
                  className="inline-block font-body text-sm uppercase tracking-[0.2em] border border-foreground text-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-500"
                >
                  Back to Home
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map((post, i) => (
                  <Link
                    key={post.id}
                    to={`/journal/${post.slug}`}
                    className="group block opacity-0 animate-fade-up"
                    style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
                  >
                    <div className="aspect-[16/10] overflow-hidden mb-6 bg-muted">
                      {post.cover_image_url ? (
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-secondary flex items-center justify-center">
                          <span className="font-heading text-2xl text-muted-foreground">TG</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span className="font-body text-xs uppercase tracking-[0.2em] text-accent">
                        {new Date(post.published_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="font-heading text-2xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="font-body text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
