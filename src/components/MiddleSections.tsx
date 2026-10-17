/* --- Reader Voices -------------------------------------- */
interface ReviewVoice {
  quote: string;
  title: string;
  name: string;
  origin: string;
  dest: string;
  countryFlag: string;
  bookTitle: string;
  amazonUrl: string;
  initials: string;
  color: string;
  rating: number;
}

const REVIEWS: ReviewVoice[] = [
  {
    title: "An absolute culinary masterpiece!",
    quote:
      "This guide saved us from tourist trap restaurants in Rome. The hidden trattoria recommendations and local ordering tips made our trip unforgettable. Highly recommended!",
    name: "Sarah Jenkins",
    origin: "United States",
    countryFlag: "🇺🇸",
    dest: "Rome, Italy",
    bookTitle: "A Food Lover's Travel Guide to Rome",
    amazonUrl: "https://www.amazon.com/dp/B0FCF1PYGG",
    initials: "SJ",
    color: "#c96b4f",
    rating: 5,
  },
  {
    title: "Invaluable for our Istanbul & Cappadocia trip",
    quote:
      "From navigating the Grand Bazaar to hot air balloon booking tips in Cappadocia, this guide feels like having an expert local friend holding your hand.",
    name: "Michael O'Connor",
    origin: "United Kingdom",
    countryFlag: "🇬🇧",
    dest: "Cappadocia & Istanbul",
    bookTitle: "The Essential Travel Guide to Türkiye",
    amazonUrl: "https://www.amazon.com/dp/B0GT2NZLH8",
    initials: "MO",
    color: "#3e7f86",
    rating: 5,
  },
  {
    title: "Essential for understanding ancient wonders",
    quote:
      "Clear, concise, and incredibly respectful of local culture. The practical tips on visiting the Pyramids and Luxor temples without the hassle were spot on.",
    name: "Dr. Ahmed Al-Mansoor",
    origin: "Canada",
    countryFlag: "🇨🇦",
    dest: "Cairo, Luxor & Nile",
    bookTitle: "Egypt for First-Timers",
    amazonUrl: "https://www.amazon.com/dp/B0GSL9CWZ6",
    initials: "AM",
    color: "#86733d",
    rating: 5,
  },
  {
    title: "Felt like a true Parisian insider",
    quote:
      "The bakery recommendations and neighborhood walking routes are pure gold. Avoided the long queues and discovered magical local cafes we never would have found.",
    name: "Emily Dupont",
    origin: "France",
    countryFlag: "🇫🇷",
    dest: "Paris, France",
    bookTitle: "Paris for First-Timers",
    amazonUrl: "https://www.amazon.com/dp/B0H21PTJ77",
    initials: "ED",
    color: "#272625",
    rating: 5,
  },
  {
    title: "Exactly what every traveler needs",
    quote:
      "Spot on advice about Gaudí sites, tapas etiquette, and avoiding pickpockets on La Rambla. Practical wisdom delivered with warmth and clarity.",
    name: "Carlos Mendez",
    origin: "Spain",
    countryFlag: "🇪🇸",
    dest: "Barcelona, Spain",
    bookTitle: "Barcelona: Tourist to Insider",
    amazonUrl: "https://www.amazon.com/dp/B0GHGM2TCX",
    initials: "CM",
    color: "#8a6747",
    rating: 5,
  },
  {
    title: "Bike etiquette and canal secrets!",
    quote:
      "Mastering bike etiquette in Amsterdam can be terrifying for newbies, but this guide made me feel like a pro from day one. Wonderful local perspective.",
    name: "Jessica van der Meer",
    origin: "Netherlands",
    countryFlag: "🇳🇱",
    dest: "Amsterdam, Netherlands",
    bookTitle: "Amsterdam for First-Timers",
    amazonUrl: "https://www.amazon.com/dp/B0H9G3JJCJ",
    initials: "JM",
    color: "#5e5a5e",
    rating: 5,
  },
];

function ReviewCardItem({ v }: { v: ReviewVoice }) {
  return (
    <div className="voice-card">
      <div className="voice-card-top">
        <div className="voice-stars" aria-label="5 out of 5 stars">
          {"★".repeat(v.rating)}
        </div>
        <span className="voice-verified-badge">
          <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
            <path d="M13.485 1.431a1.473 1.473 0 0 0-2.104-.993l-1.89.873a1.47 1.47 0 0 1-1.288 0l-1.89-.873a1.473 1.473 0 0 0-2.104.993l-.403 2.045a1.47 1.47 0 0 1-.91 1.09l-1.92.793a1.474 1.474 0 0 0-.65 2.238l1.24 1.688c.277.377.362.86.23 1.314l-.587 2.002a1.473 1.473 0 0 0 1.547 1.844l2.08-.242a1.47 1.47 0 0 1 1.25.56l1.28 1.66c.552.716 1.636.716 2.188 0l1.28-1.66a1.47 1.47 0 0 1 1.25-.56l2.08.242a1.473 1.473 0 0 0 1.547-1.844l-.587-2.002a1.47 1.47 0 0 1 .23-1.314l1.24-1.688a1.474 1.474 0 0 0-.65-2.238l-1.92-.793a1.47 1.47 0 0 1-.91-1.09l-.403-2.045zM7.054 11.207L4.17 8.324l1.06-1.06 1.824 1.823 4.772-4.772 1.06 1.06-5.832 5.832z"/>
          </svg>
          Verified Amazon Reader
        </span>
      </div>

      <a
        href={v.amazonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="voice-book-pill"
        title={`View ${v.bookTitle} on Amazon`}
      >
        <span className="voice-book-flag">{v.countryFlag}</span>
        <span className="voice-book-title">{v.bookTitle}</span>
        <span className="voice-book-arrow">↗</span>
      </a>

      <h3 className="voice-review-title">&ldquo;{v.title}&rdquo;</h3>

      <p className="voice-quote">{v.quote}</p>

      <div className="voice-meta">
        <div className="voice-avatar" style={{ background: v.color }}>
          {v.initials}
        </div>
        <div className="voice-info">
          <strong>{v.name}</strong>
          <span>
            {v.countryFlag} {v.origin} &middot; visited {v.dest}
          </span>
        </div>
      </div>
    </div>
  );
}

function ReaderVoicesSection() {
  return (
    <>
      <div className="wave up" style={{ color: "var(--sand2)" }}>
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
          <path fill="currentColor" d="M0 -1H1200V44C1050 74 880 14 650 40S250 74 0 36Z" />
        </svg>
      </div>

      <section className="voices" id="voices">
        <div className="wrap">
          <div className="voices-head">
            <span className="hiw-label">✦ 6 Real Amazon Reviews Across 6 Countries ✦</span>
            <h2>Travels that stayed with them</h2>
            <p className="voices-sub">
              Verified stories and 5-star ratings from readers exploring Rome, Türkiye, Egypt, Paris, Barcelona & Amsterdam.
            </p>
          </div>
        </div>

        {/* Full-width continuous dual-group infinite auto-scrolling marquee */}
        <div className="voices-marquee-wrapper" aria-label="Auto-scrolling reader reviews">
          <div className="voices-group">
            {REVIEWS.map((v, idx) => (
              <ReviewCardItem v={v} key={`g1-${v.dest}-${idx}`} />
            ))}
          </div>
          <div className="voices-group" aria-hidden="true">
            {REVIEWS.map((v, idx) => (
              <ReviewCardItem v={v} key={`g2-${v.dest}-${idx}`} />
            ))}
          </div>
        </div>

        <div className="voices-hint">
          <span>✦ Auto-scrolling 6 country reviews &middot; Hover to pause &middot; Click any book tag to view on Amazon ✦</span>
        </div>
      </section>
    </>
  );
}

export { ReaderVoicesSection };


