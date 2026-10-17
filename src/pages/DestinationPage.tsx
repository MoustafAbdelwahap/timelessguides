import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import FloatingBookingCTA from "@/components/FloatingBookingCTA";
import NotFound from "./NotFound";
import { fetchDestinationBySlug, fetchBookBySlug, type Destination, type Book } from "@/lib/content";
import { getDestinationImage } from "@/lib/images";

const BASE_URL = "https://www.timelessguides.com";

export default function DestinationPage() {
  const { slug } = useParams<{ slug: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchDestinationBySlug(slug).then(async (d) => {
      setDestination(d);
      if (d?.book_slug) {
        setBook(await fetchBookBySlug(d.book_slug));
      }
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

  if (!destination) return <NotFound />;

  const image = destination.hero_image_url || getDestinationImage(destination.slug);
  const absoluteImage = image.startsWith("http") ? image : `${BASE_URL}${image}`;

  const destinationSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.name,
    description: destination.meta_description,
    image: absoluteImage,
    url: `${BASE_URL}/destinations/${destination.slug}`,
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={destination.meta_title}
        description={destination.meta_description}
        path={`/destinations/${destination.slug}`}
        image={absoluteImage}
        imageAlt={destination.name}
        schemas={[destinationSchema]}
      />
      <Navbar />
      <FloatingBookingCTA />

      <main className="pt-24">
        <section className="relative h-[60vh] min-h-[420px] flex items-end">
          <img src={image} alt={destination.name} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-foreground/40" />
          <div className="relative z-10 container mx-auto px-6 pb-16 md:pb-20">
            <Link to="/" className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-[0.2em] text-white/90 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <p className="font-body text-sm uppercase tracking-[0.3em] text-white/80 mb-3">{destination.subtitle}</p>
            <h1 className="font-heading text-5xl md:text-7xl font-semibold text-white leading-[1.1] text-balance">{destination.name}</h1>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 max-w-3xl">
            {destination.intro.map((paragraph, i) => (
              <p key={i} className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                {paragraph}
              </p>
            ))}

            {destination.experiences.length > 0 && (
              <>
                <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mt-16 mb-10">Top Experiences</h2>
                <div className="grid gap-8">
                  {destination.experiences.map((experience, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-accent/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{experience.title}</h3>
                        <p className="font-body text-muted-foreground leading-relaxed">{experience.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {book && (
              <div className="mt-16 border border-border bg-card p-8 md:p-10">
                <p className="font-body text-xs uppercase tracking-[0.2em] text-accent mb-3">Recommended Read</p>
                <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4">{book.title}</h3>
                <p className="font-body text-muted-foreground leading-relaxed mb-8">{book.description}</p>
                <Link to={`/books/${book.slug}`} className="inline-block font-body text-sm uppercase tracking-[0.2em] border border-foreground text-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-500">
                  Explore the Book
                </Link>
              </div>
            )}

            <div className="mt-16 text-center">
              <Link to="/connect" className="inline-block font-body text-sm uppercase tracking-[0.2em] bg-accent text-accent-foreground px-10 py-4 hover:bg-accent/90 transition-colors">
                Book an Istanbul Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
