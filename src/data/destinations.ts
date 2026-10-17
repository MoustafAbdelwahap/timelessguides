export interface DestinationExperience {
  title: string;
  description: string;
}

export interface Destination {
  slug: string;
  name: string;
  subtitle: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  experiences: DestinationExperience[];
  bookSlug: string;
}

export const destinations: Destination[] = [
  {
    slug: "rome",
    name: "Rome",
    subtitle: "The Eternal City",
    shortDescription:
      "Walk through millennia of art, architecture, and la dolce vita.",
    metaTitle: "Rome Travel Guide — Timeless Guides",
    metaDescription:
      "Plan your Rome trip with curated tips on ancient sites, neighbourhood walks, and local food. A practical guide for culturally curious travellers.",
    intro: [
      "Rome is a city best understood on foot. Cobblestones lead from imperial ruins to Renaissance squares, and every corner reveals a layer of history that guidebooks often miss.",
      "Beyond the Colosseum, the real magic is in the neighbourhoods — Trastevere's lantern-lit alleys, Testaccio's family-run trattorias, and the quiet grandeur of the Aventine Hill.",
    ],
    experiences: [
      {
        title: "Ancient Rome at Dawn",
        description:
          "Start early at the Colosseum and Roman Forum before the crowds arrive, then climb Palatine Hill for views over the Forum.",
      },
      {
        title: "Trastevere Food Walk",
        description:
          "Taste supplì, carciofi alla giudia, and aperitivo in one of Rome's most atmospheric quarters.",
      },
      {
        title: "Vatican & St. Peter's",
        description:
          "Book a timed entry to the Museums and end in the Basilica, where Bramante's architecture stops even seasoned travellers in their tracks.",
      },
    ],
    bookSlug: "food-lovers-travel-guide-to-rome",
  },
  {
    slug: "egypt",
    name: "Egypt",
    subtitle: "Land of the Pharaohs",
    shortDescription:
      "Uncover the mysteries of ancient civilizations along the Nile.",
    metaTitle: "Egypt Travel Guide — Timeless Guides",
    metaDescription:
      "Discover Egypt's temples, deserts, and cities with practical tips on timing, safety, and cultural etiquette for first-time visitors.",
    intro: [
      "Egypt is one of the few places on earth where ancient history feels immediate. Standing before the Pyramids of Giza or sailing the Nile at sunset, you sense a continuity that spans thousands of years.",
      "The country rewards slow travel. A few well-planned days in Cairo, Luxor, and Aswan — with space for spontaneous mint tea and felucca rides — often beats a packed checklist.",
    ],
    experiences: [
      {
        title: "Pyramids & Sphinx at Sunrise",
        description:
          "Arrive early to Giza for softer light, smaller crowds, and the chance to explore the plateau in relative peace.",
      },
      {
        title: "Nile Cruise from Luxor to Aswan",
        description:
          "Sail past temples at Edfu and Kom Ombo, stopping to wander columns carved with hieroglyphs still bright after millennia.",
      },
      {
        title: "Red Sea Diving",
        description:
          "From Hurghada to Dahab, the Red Sea offers clear water, coral reefs, and world-class diving for all levels.",
      },
    ],
    bookSlug: "egypt-for-first-timers",
  },
  {
    slug: "turkiye",
    name: "Türkiye",
    subtitle: "Where East Meets West",
    shortDescription:
      "From Cappadocia's fairy chimneys to Istanbul's grand bazaars.",
    metaTitle: "Türkiye Travel Guide — Timeless Guides",
    metaDescription:
      "Explore Türkiye with local insight: Istanbul bazaars, Cappadocia hot-air balloons, Aegean ruins, and practical travel tips for every region.",
    intro: [
      "Türkiye is a country of contrasts. In a single trip you can wake to hot-air balloons over Cappadocia, haggle for spices in an Istanbul bazaar, and swim in the turquoise coves of the Aegean coast.",
      "Its cuisine is just as varied — from meze by the Bosphorus to home-cooked kebabs in the southeast. The key is pacing: linger long enough to let the layers reveal themselves.",
    ],
    experiences: [
      {
        title: "Istanbul's Old City & Bosphorus",
        description:
          "Visit the Hagia Sophia, Blue Mosque, and Grand Bazaar, then take a ferry between Europe and Asia for sunset.",
      },
      {
        title: "Cappadocia by Balloon",
        description:
          "Book a sunrise balloon flight over fairy chimneys and cave dwellings, then explore underground cities carved by early Christians.",
      },
      {
        title: "Ephesus & the Aegean Coast",
        description:
          "Walk the marble streets of Ephesus and relax in a seaside village where the pace slows and the food is fresh.",
      },
    ],
    bookSlug: "essential-travel-guide-to-turkiye",
  },
];
