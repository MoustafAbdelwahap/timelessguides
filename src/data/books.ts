export interface Book {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  amazonUrl: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  details: string[];
  coverImage: string;
  mockup3d?: string;
  spineColor: string;
  badge?: string;
  tag?: string;
  destinationSlug?: string;
  asin?: string;
}

export const books: Book[] = [
  {
    slug: "essential-travel-guide-to-turkiye",
    title: "The Essential Travel Guide to Türkiye",
    subtitle: "Istanbul, Cappadocia, Antalya & Beyond",
    category: "COUNTRY GUIDE",
    amazonUrl: "https://www.amazon.com/dp/B0GT2NZLH8",
    metaTitle: "Essential Travel Guide to Türkiye — Timeless Guides",
    metaDescription:
      "Plan a trip across Türkiye: Istanbul, Cappadocia, the Aegean coast, and beyond. Practical tips and local insight for slow travellers.",
    description:
      "This guide moves beyond Istanbul to cover Türkiye's most rewarding regions. From hot-air balloons over Cappadocia to ancient ruins along the Aegean, it is designed for travellers who want depth without rushing.",
    details: [
      "Regional guides to Cappadocia, Ephesus, Pamukkale, Antalya, and the Black Sea coast",
      "Practical advice on domestic flights, buses, and car rental",
      "Cultural notes on Turkish hospitality, dress codes, and regional cuisine",
      "Suggested itineraries for one week and two weeks",
    ],
    coverImage: "/books/the-essential-travel-guide-to-turkiye.jpg",
    mockup3d: "/books/mockups/turkiye-3d.png",
    spineColor: "#6c796b",
    badge: "Top Rated",
    tag: "Country Guide",
    destinationSlug: "turkiye",
    asin: "B0GT2NZLH8",
  },
  {
    slug: "egypt-for-first-timers",
    title: "Egypt for First-Timers",
    subtitle: "Ancient Wonders, Cairo & The Nile",
    category: "ANCIENT WONDERS",
    amazonUrl: "https://www.amazon.com/dp/B0GSL9CWZ6",
    metaTitle: "Egypt for First-Timers — Timeless Guides",
    metaDescription:
      "Everything first-time visitors need for Egypt: Cairo, Luxor, Aswan, Nile cruises, and practical travel advice.",
    description:
      "Egypt for First-Timers cuts through the noise and gives you a clear, respectful path through the country's ancient wonders. It covers what to expect, what to wear, how to handle vendors, and how to build an itinerary that leaves room for wonder.",
    details: [
      "Step-by-step planning for Cairo, Luxor, Aswan, and a Nile cruise",
      "Tips on timing, tickets, and avoiding crowds at the major sites",
      "Cultural etiquette and advice for solo travellers and families",
      "A 10-day itinerary for first-time visitors",
    ],
    coverImage: "/books/egypt-for-first-timers.jpg",
    mockup3d: "/books/mockups/egypt-3d.png",
    spineColor: "#86733d",
    badge: "Popular",
    tag: "Ancient Wonders",
    destinationSlug: "egypt",
    asin: "B0GSL9CWZ6",
  },
  {
    slug: "food-lovers-travel-guide-to-rome",
    title: "A Food Lover's Guide to Rome",
    subtitle: "Iconic Sights, Authentic Cuisine & Hidden Gems",
    category: "CULINARY GUIDE",
    amazonUrl: "https://www.amazon.com/dp/B0FCF1PYGG",
    metaTitle: "Food Lover's Travel Guide to Rome — Timeless Guides",
    metaDescription:
      "Eat your way through Rome like a local. Trastevere, Testaccio, markets, aperitivo, and the dishes that define Roman cuisine.",
    description:
      "This is not a list of tourist menus. It is a food lover's map of Rome, built around the neighbourhoods, markets, and family-run spots where Romans actually eat. Use it to plan meals, snacks, and aperitivo for a trip you'll taste long after you leave.",
    details: [
      "Neighbourhood food walks through Trastevere, Testaccio, and the Jewish Ghetto",
      "Market guides, street food, and where to find the best carbonara and cacio e pepe",
      "Aperitivo culture, wine bars, and gelato worth the queue",
      "A 3-day food-focused itinerary",
    ],
    coverImage: "/books/a-food-lover-s-travel-guide-to-rome.jpg",
    mockup3d: "/books/mockups/rome-3d.png",
    spineColor: "#899486",
    badge: "Food & Wine",
    tag: "Culinary Guide",
    destinationSlug: "rome",
    asin: "B0FCF1PYGG",
  },
  {
    slug: "paris-for-first-timers",
    title: "Paris for First-Timers",
    subtitle: "Culture, Art, Cuisine & Hidden Gems",
    category: "CITY GUIDE",
    amazonUrl: "https://www.amazon.com/dp/B0H21PTJ77",
    metaTitle: "Paris for First-Timers — Timeless Guides",
    metaDescription:
      "A first-timer's guide to Paris: arrondissements, dining, museums, and local etiquette. Plan a confident visit with Timeless Guides.",
    description:
      "Paris for First-Timers is a practical, affectionate introduction to the city. It helps you choose where to stay, how to order a coffee, which museums to book in advance, and where to find the quiet Paris beyond the postcard.",
    details: [
      "Arrondissement-by-arrondissement guide to staying and exploring",
      "Dining tips: cafés, bistros, markets, and how to read a French menu",
      "Museum strategy, day trips, and seasonal events",
      "A 5-day first-timer itinerary",
    ],
    coverImage: "/books/paris-for-first-timers.jpg",
    mockup3d: "/books/mockups/paris-3d.png",
    spineColor: "#272625",
    tag: "City Guide",
    destinationSlug: "paris",
    asin: "B0H21PTJ77",
  },
  {
    slug: "barcelona-tourist-traps-to-avoid",
    title: "Barcelona: Tourist to Insider",
    subtitle: "Local Hidden Gems & Authentic Experiences",
    category: "INSIDER SERIES",
    amazonUrl: "https://www.amazon.com/dp/B0GHGM2TCX",
    metaTitle: "Barcelona: Tourist Traps to Avoid — Timeless Guides",
    metaDescription:
      "See Barcelona's real character and avoid the tourist traps. Local tips on neighbourhoods, dining, and experiences off the beaten path.",
    description:
      "Barcelona is beautiful, but its most famous streets are not always its best. This guide steers you around the tourist traps and toward the restaurants, bars, and neighbourhoods where the city's real character lives.",
    details: [
      "Overrated spots to skip and the local alternatives nearby",
      "Neighbourhood guides to Gràcia, El Born, Poblenou, and Barceloneta",
      "Dining tips for tapas, pintxos, and Catalan wine",
      "A 4-day itinerary focused on authentic Barcelona",
    ],
    coverImage: "/books/barcelona-tourist-traps-to-avoid.jpg",
    mockup3d: "/books/mockups/barcelona-3d.png",
    spineColor: "#8a6747",
    tag: "Insider Secrets",
    destinationSlug: "barcelona",
    asin: "B0GHGM2TCX",
  },
  {
    slug: "amsterdam-for-first-timers",
    title: "Amsterdam for First-Timers",
    subtitle: "Canals, Culture & Bike Etiquette",
    category: "CITY GUIDE",
    amazonUrl: "https://www.amazon.com/dp/B0H9G3JJCJ",
    metaTitle: "Amsterdam for First-Timers — Timeless Guides",
    metaDescription:
      "A practical, culturally attuned guide to Amsterdam: canals, museums, cycling rules, and local etiquette.",
    description:
      "Amsterdam for First-Timers cuts through the clichés. It covers navigating bike lanes, exploring Jordaan and De Pijp, booking key museums, and tasting local delicacies like bitterballen and stroopwafels.",
    details: [
      "Essential cycling rules and pedestrian etiquette",
      "Museum strategy: Rijksmuseum, Van Gogh, and hidden gems",
      "Neighbourhood walks through Jordaan, De Pijp, and Oud-West",
      "A 4-day first-timer itinerary",
    ],
    coverImage: "/books/amsterdam-for-first-timers.jpg",
    mockup3d: "/books/mockups/amsterdam-3d.png",
    spineColor: "#5e5a5e",
    badge: "New Release",
    tag: "City Guide",
    destinationSlug: "amsterdam",
    asin: "B0H9G3JJCJ",
  },
  {
    slug: "istanbul-for-first-timers",
    title: "Istanbul for First-Timers",
    subtitle: "A Local's Guide to Culture & Hidden Gems",
    category: "CITY GUIDE",
    amazonUrl: "https://www.amazon.com/dp/B0FXHL554L",
    metaTitle: "Istanbul for First-Timers — Timeless Guides",
    metaDescription:
      "A practical, culturally rich guide for first-time visitors to Istanbul: neighbourhoods, food, transport, and essential etiquette.",
    description:
      "Istanbul for First-Timers is the companion we wish we'd had on our first trip. It balances practical logistics — how to use the Istanbulkart, when to visit the mosques, what to wear — with the deeper cultural context that makes the city unforgettable.",
    details: [
      "Neighbourhood-by-neighbourhood walks through Sultanahmet, Beyoğlu, Kadıköy, and the Bosphorus villages",
      "Dining tips from street food to meyhanes, plus a primer on Turkish breakfast",
      "Transport, etiquette, and safety advice from a local perspective",
      "A 7-day starter itinerary for first-time visitors",
    ],
    coverImage: "/books/istanbul-for-first-timers.jpg",
    mockup3d: "/books/mockups/istanbul-3d.png",
    spineColor: "#7c6448",
    badge: "Bestseller",
    tag: "City Guide",
    destinationSlug: "istanbul",
    asin: "B0FXHL554L",
  },
  {
    slug: "the-little-book-of-italian-wisdom",
    title: "The Little Book of Italian Wisdom",
    subtitle: "Proverbs, Sayings & Life Lessons",
    category: "CULTURAL WISDOM",
    amazonUrl: "https://www.amazon.com/dp/B0HCMJHB8X",
    metaTitle: "The Little Book of Italian Wisdom — Timeless Guides",
    metaDescription:
      "Cherished Italian proverbs, colloquial idioms, and philosophies on food, family, and slow living.",
    description:
      "A heartwarming treasury of Italy's most poetic, humorous, and enduring expressions. Illustrated and contextualized to reveal the true soul of Italian life.",
    details: [
      "Over 100 authentic Italian proverbs with English translations and cultural context",
      "Wisdom on dining, wine, passion, and la dolce vita",
      "Regional sayings from Rome, Florence, Naples, and Sicily",
      "Pocket-sized gift edition for lovers of Italy",
    ],
    coverImage: "/books/the-little-book-of-italian-wisdom-proverbs-funny-sayings-life-lessons-from-italy.jpg",
    mockup3d: "/books/mockups/the-little-book-of-italian-wisdom-3d.png",
    spineColor: "#8c6b45",
    badge: "Keepsake Gift",
    tag: "Cultural Wisdom",
    destinationSlug: "rome",
    asin: "B0HCMJHB8X",
  },
  {
    slug: "the-little-book-of-turkish-wisdom",
    title: "The Little Book of Turkish Wisdom",
    subtitle: "Proverbs, Idioms & Folk Tales",
    category: "CULTURAL WISDOM",
    amazonUrl: "https://www.amazon.com/dp/B0HCK1RVK1",
    metaTitle: "The Little Book of Turkish Wisdom — Timeless Guides",
    metaDescription:
      "Timeless Turkish proverbs, humorous idioms, and life lessons from Istanbul to Anatolia.",
    description:
      "From tea-drinking rituals to ancient Nasreddin Hodja fables, this collection celebrates Türkiye's rich tradition of oral wisdom and everyday humor.",
    details: [
      "Authentic Turkish proverbs and their metaphorical meanings",
      "Classic tales of wit and warmth from Nasreddin Hodja",
      "Insights into Turkish hospitality, patience, and community",
      "Beautiful pocket keepsake for culturally curious travellers",
    ],
    coverImage: "/books/the-little-book-of-turkish-wisdom-proverbs-funny-idioms-folk-tales-life-lessons-from-turkiye.jpg",
    mockup3d: "/books/mockups/the-little-book-of-turkish-wisdom-3d.png",
    spineColor: "#877651",
    tag: "Cultural Wisdom",
    destinationSlug: "turkiye",
    asin: "B0HCK1RVK1",
  },
];
