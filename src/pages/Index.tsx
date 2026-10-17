import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DestinationsSection from "@/components/DestinationsSection";
import { ReaderVoicesSection } from "@/components/MiddleSections";
import BoardingPassNewsletter from "@/components/BoardingPassNewsletter";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { books } from "@/data/books";
import { getBookCover } from "@/lib/images";

const BASE_URL = "https://www.timelessguides.com";

const bookSchemas = books.map((book) => ({
  "@context": "https://schema.org",
  "@type": "Book",
  name: book.title,
  description: book.description,
  image: `${BASE_URL}${getBookCover(book.slug)}`,
  url: `${BASE_URL}/books/${book.slug}`,
  author: {
    "@type": "Organization",
    name: "Timeless Guides",
  },
  publisher: {
    "@type": "Organization",
    name: "Timeless Guides",
  },
  offers: {
    "@type": "Offer",
    url: book.amazonUrl,
    availability: "https://schema.org/InStock",
    priceCurrency: "USD",
    itemOffered: {
      "@type": "Book",
    },
  },
}));

export default function Index() {
  return (
    <div className="min-h-screen" style={{ background: "var(--sand)" }}>
      <SEO
        title="Timeless Guides — Travel Books & Local-Led Journeys"
        description="Curated travel guides, local-led consultations, and slow-travel stories for culturally curious travellers."
        path="/"
        schemas={bookSchemas}
      />
      <Navbar />
      <HeroSection />
      <DestinationsSection />
      <ReaderVoicesSection />
      <BoardingPassNewsletter />
      <Footer />
    </div>
  );
}
