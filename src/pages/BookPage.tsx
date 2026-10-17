import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart, BookOpen, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import FloatingBookingCTA from "@/components/FloatingBookingCTA";
import NotFound from "./NotFound";
import { fetchBookBySlug, type Book } from "@/lib/content";
import { getBookCover } from "@/lib/images";
import { books as localBooks } from "@/data/books";

const BASE_URL = "https://www.timelessguides.com";

export default function BookPage() {
  const { slug } = useParams<{ slug: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchBookBySlug(slug)
      .then((b) => {
        if (b) {
          setBook(b);
        } else {
          const local = localBooks.find((item) => item.slug === slug);
          if (local) {
            setBook({
              id: local.slug,
              slug: local.slug,
              title: local.title,
              subtitle: local.subtitle,
              amazon_url: local.amazonUrl,
              meta_title: local.metaTitle,
              meta_description: local.metaDescription,
              description: local.description,
              details: local.details,
              cover_image_url: local.coverImage || null,
              published: true,
              sort_order: 0,
            });
          }
        }
      })
      .catch(() => {
        const local = localBooks.find((item) => item.slug === slug);
        if (local) {
          setBook({
            id: local.slug,
            slug: local.slug,
            title: local.title,
            subtitle: local.subtitle,
            amazon_url: local.amazonUrl,
            meta_title: local.metaTitle,
            meta_description: local.metaDescription,
            description: local.description,
            details: local.details,
            cover_image_url: local.coverImage || null,
            published: true,
            sort_order: 0,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!book) return <NotFound />;

  const cover = book.cover_image_url || getBookCover(book.slug);
  const absoluteCover = cover.startsWith("http") ? cover : `${BASE_URL}${cover}`;

  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    description: book.description,
    image: absoluteCover,
    url: `${BASE_URL}/books/${book.slug}`,
    author: { "@type": "Organization", name: "Timeless Guides" },
    publisher: { "@type": "Organization", name: "Timeless Guides" },
    offers: {
      "@type": "Offer",
      url: book.amazon_url,
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      itemOffered: { "@type": "Book" },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={book.meta_title}
        description={book.meta_description}
        path={`/books/${book.slug}`}
        image={absoluteCover}
        imageAlt={book.title}
        schemas={[bookSchema]}
      />
      <Navbar />
      <FloatingBookingCTA />

      <main className="pt-24">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <Link to="/#books" className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors mb-10">
              <ArrowLeft className="w-4 h-4" />
              Back to Books
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="aspect-[3/4] overflow-hidden bg-muted shadow-sm">
                <img src={cover} alt={book.title} className="w-full h-full object-cover" loading="eager" />
              </div>

              <div className="lg:pt-8">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-accent" />
                  <span className="font-body text-xs uppercase tracking-[0.25em] text-accent">Timeless Guides Book</span>
                </div>
                <p className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">{book.subtitle}</p>
                <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground leading-[1.1] mb-8">{book.title}</h1>
                <p className="font-body text-lg text-muted-foreground leading-relaxed mb-10">{book.description}</p>

                {book.details.length > 0 && (
                  <>
                    <h2 className="font-heading text-xl font-semibold text-foreground mb-4">What's inside</h2>
                    <ul className="space-y-4 mb-10">
                      {book.details.map((detail, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                          <span className="font-body text-muted-foreground leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {book.amazon_url && (
                  <a href={book.amazon_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-body text-sm uppercase tracking-[0.2em] bg-accent text-accent-foreground px-10 py-4 hover:bg-accent/90 transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                    Buy on Amazon
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
