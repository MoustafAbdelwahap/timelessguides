import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationForm from "@/components/ConsultationForm";
import SEO from "@/components/SEO";
import { MapPin, Clock, Sparkles, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Our consultation transformed our trip. We discovered meyhanes and viewpoints we'd never have found on our own.",
    name: "Sophie L.",
    location: "Paris, France",
  },
  {
    quote:
      "Felt like planning Istanbul with a trusted friend. Every recommendation by our local guide Elif was spot on and beautifully personal.",
    name: "Daniel K.",
    location: "Berlin, Germany",
  },
  {
    quote:
      "The reservations and personalized itinerary made everything effortless. We came home with stories, not stress.",
    name: "Aisha M.",
    location: "London, UK",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-sm uppercase tracking-[0.3em] text-accent mb-4">
            Kind Words
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground text-balance">
            From Travellers to Istanbul
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="border border-border bg-card p-8 md:p-10 shadow-sm hover:shadow-lg transition-shadow duration-500 flex flex-col"
            >
              <Quote className="w-6 h-6 text-accent mb-6" />
              <p className="font-body text-base text-foreground leading-relaxed mb-8 flex-1">
                "{t.quote}"
              </p>
              <div className="border-t border-border pt-5">
                <p className="font-heading text-base font-semibold text-foreground">
                  {t.name}
                </p>
                <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
                  {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IstanbulConsultation = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-sm uppercase tracking-[0.3em] text-accent mb-4">
            Featured Offering
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground text-balance">
            Personal Consultations
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="border border-border bg-card p-10 md:p-14 shadow-sm h-fit">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="font-body text-xs uppercase tracking-[0.25em] text-accent">
                Istanbul, Türkiye
              </span>
            </div>

            <h3 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Istanbul
            </h3>

            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-10">
              Get ready for your trip with a one-on-one session with a local
              insider to shape your Istanbul journey. Craft an itinerary that
              feels personal, unhurried, and deeply rooted in the city's living
              culture. Get help with making the necessary reservations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent mt-1 shrink-0" />
                <div>
                  <h4 className="font-heading text-base font-semibold text-foreground mb-1">
                    60-Minute Session
                  </h4>
                  <p className="font-body text-sm text-muted-foreground">
                    Conducted via video call at a time that suits you.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-accent mt-1 shrink-0" />
                <div>
                  <h4 className="font-heading text-base font-semibold text-foreground mb-1">
                    Tailored Itinerary
                  </h4>
                  <p className="font-body text-sm text-muted-foreground">
                    Neighbourhoods, meals, and experiences chosen for you.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
                Starting from
              </p>
              <p className="font-heading text-3xl font-semibold text-foreground">
                €20
              </p>
            </div>
          </div>

          <div className="border border-border bg-card p-10 md:p-14 shadow-sm">
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-6">
              Request a Consultation
            </h3>
            <p className="font-body text-muted-foreground mb-8 leading-relaxed">
              Share a few details about your trip and we’ll reply within 24 hours to arrange your session.
            </p>
            <ConsultationForm offering="Istanbul" buttonText="Book Your Consultation" />
          </div>
        </div>
      </div>
    </section>
  );
};

const BASE_URL = "https://www.timelessguides.com";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Istanbul Personal Consultation",
  provider: {
    "@type": "Organization",
    name: "Timeless Guides",
    url: `${BASE_URL}/`,
  },
  areaServed: {
    "@type": "City",
    name: "Istanbul",
    containedInPlace: {
      "@type": "Country",
      name: "Türkiye",
    },
  },
  description:
    "Book a personal 60-minute consultation with a local insider in Istanbul to shape your itinerary and get help with reservations.",
  offers: {
    "@type": "Offer",
    price: "20",
    priceCurrency: "EUR",
    url: `${BASE_URL}/connect`,
    availability: "https://schema.org/InStock",
    description: "Starting from €20 for a 60-minute session",
  },
};

const ConnectWithLocals = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Connect with Locals — Timeless Guides"
        description="Book a personal consultation with a local insider in Istanbul. Craft a tailored itinerary and get help with reservations."
        path="/connect"
        schemas={[serviceSchema]}
      />
      <Navbar />
      <div className="pt-24">
        <IstanbulConsultation />
        <Testimonials />
      </div>
      <Footer />
    </div>
  );
};

export default ConnectWithLocals;

