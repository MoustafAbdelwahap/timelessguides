import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader2, MapPin, ExternalLink, Lightbulb, ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
import NewsletterForm from "@/components/NewsletterForm";
import { fetchCompanionBySlug, fetchBookBySlug, type BookCompanion, type Book } from "@/lib/content";
import { getBookCover } from "@/lib/images";

export default function CompanionPage() {
  const { bookSlug } = useParams<{ bookSlug: string }>();
  const [companion, setCompanion] = useState<BookCompanion | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookSlug) return;
    setLoading(true);
    Promise.all([fetchCompanionBySlug(bookSlug), fetchBookBySlug(bookSlug)]).then(([c, b]) => {
      setCompanion(c);
      setBook(b);
      setLoading(false);
    });
  }, [bookSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  const title = companion?.title || book?.title || "Reader Companion";
  const cover = book?.cover_image_url || (book ? getBookCover(book.slug) : null);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${title} — Reader Companion | Timeless Guides`}
        description="Bonus maps, updates, and links for readers of this Timeless Guides book."
        path={`/companion/${bookSlug}`}
        noindex
      />

      <main className="pt-16 pb-24">
        <div className="container mx-auto px-6 max-w-2xl">
          <Link to="/" className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground mb-10">
            <ArrowLeft className="w-3 h-3" />
            Timeless Guides
          </Link>

          <div className="flex items-start gap-5 mb-10">
            {cover && (
              <img src={cover} alt={book?.title || ""} className="w-20 h-28 object-cover shrink-0" />
            )}
            <div>
              <p className="font-body text-xs uppercase tracking-[0.25em] text-accent mb-2">Reader Companion</p>
              <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground leading-tight">{title}</h1>
            </div>
          </div>

          {companion?.intro && (
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-12">{companion.intro}</p>
          )}

          {!companion && (
            <div className="border border-border bg-card p-8 mb-12">
              <p className="font-body text-muted-foreground">
                Companion content for this book is coming soon. Sign up below and we'll notify you the moment it goes live.
              </p>
            </div>
          )}

          {companion?.sections?.map((section, i) => (
            <div key={i} className="mb-12">
              {section.title && (
                <h2 className="font-heading text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  {section.type === "map" && <MapPin className="w-5 h-5 text-accent" />}
                  {section.type === "tip" && <Lightbulb className="w-5 h-5 text-accent" />}
                  {section.type === "link-list" && <ExternalLink className="w-5 h-5 text-accent" />}
                  {section.title}
                </h2>
              )}
              {section.body && (
                <p className="font-body text-muted-foreground leading-relaxed whitespace-pre-line">{section.body}</p>
              )}
              {section.type === "map" && section.mapUrl && (
                <a href={section.mapUrl} target="_blank" rel="noopener noreferrer" className="font-body text-sm uppercase tracking-wider text-accent underline underline-offset-4 mt-3 inline-block">
                  Open map
                </a>
              )}
              {section.type === "link-list" && section.links && (
                <ul className="mt-3 space-y-2">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="font-body text-foreground hover:text-accent inline-flex items-center gap-2 group">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="border-b border-border group-hover:border-accent">{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="mt-16 pt-12 border-t border-border">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">Stay in the loop</h2>
            <p className="font-body text-muted-foreground mb-6">
              Get travel updates, new companion content, and future book releases straight to your inbox.
            </p>
            <NewsletterForm source={`companion:${bookSlug}`} variant="featured" />
          </div>
        </div>
      </main>
    </div>
  );
}
