
CREATE TABLE public.destinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  subtitle TEXT NOT NULL DEFAULT '',
  short_description TEXT NOT NULL DEFAULT '',
  meta_title TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '',
  intro JSONB NOT NULL DEFAULT '[]'::jsonb,
  experiences JSONB NOT NULL DEFAULT '[]'::jsonb,
  book_slug TEXT,
  hero_image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.destinations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.destinations TO authenticated;
GRANT ALL ON public.destinations TO service_role;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published destinations are viewable" ON public.destinations FOR SELECT USING (published = true OR private.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins manage destinations" ON public.destinations FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE ON public.destinations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.books (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL DEFAULT '',
  amazon_url TEXT NOT NULL DEFAULT '',
  meta_title TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  details JSONB NOT NULL DEFAULT '[]'::jsonb,
  cover_image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.books TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.books TO authenticated;
GRANT ALL ON public.books TO service_role;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published books are viewable" ON public.books FOR SELECT USING (published = true OR private.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins manage books" ON public.books FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON public.books FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.book_companions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL DEFAULT '',
  intro TEXT NOT NULL DEFAULT '',
  sections JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.book_companions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.book_companions TO authenticated;
GRANT ALL ON public.book_companions TO service_role;
ALTER TABLE public.book_companions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Companions are viewable by slug" ON public.book_companions FOR SELECT USING (true);
CREATE POLICY "Admins manage companions" ON public.book_companions FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER update_book_companions_updated_at BEFORE UPDATE ON public.book_companions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.consultation_requests ADD COLUMN IF NOT EXISTS handled BOOLEAN NOT NULL DEFAULT false;

INSERT INTO public.destinations (slug, name, subtitle, short_description, meta_title, meta_description, intro, experiences, book_slug) VALUES
('rome', 'Rome', 'The Eternal City',
 'Walk through millennia of art, architecture, and la dolce vita.',
 'Rome Travel Guide — Timeless Guides',
 'Plan your Rome trip with curated tips on ancient sites, neighbourhood walks, and local food. A practical guide for culturally curious travellers.',
 '["Rome is a city best understood on foot. Cobblestones lead from imperial ruins to Renaissance squares, and every corner reveals a layer of history that guidebooks often miss.","Beyond the Colosseum, the real magic is in the neighbourhoods — Trastevere''s lantern-lit alleys, Testaccio''s family-run trattorias, and the quiet grandeur of the Aventine Hill."]'::jsonb,
 '[{"title":"Ancient Rome at Dawn","description":"Start early at the Colosseum and Roman Forum before the crowds arrive, then climb Palatine Hill for views over the Forum."},{"title":"Trastevere Food Walk","description":"Taste supplì, carciofi alla giudia, and aperitivo in one of Rome''s most atmospheric quarters."},{"title":"Vatican & St. Peter''s","description":"Book a timed entry to the Museums and end in the Basilica, where Bramante''s architecture stops even seasoned travellers in their tracks."}]'::jsonb,
 'food-lovers-travel-guide-to-rome'),
('egypt', 'Egypt', 'Land of the Pharaohs',
 'Uncover the mysteries of ancient civilizations along the Nile.',
 'Egypt Travel Guide — Timeless Guides',
 'Discover Egypt''s temples, deserts, and cities with practical tips on timing, safety, and cultural etiquette for first-time visitors.',
 '["Egypt is one of the few places on earth where ancient history feels immediate. Standing before the Pyramids of Giza or sailing the Nile at sunset, you sense a continuity that spans thousands of years.","The country rewards slow travel. A few well-planned days in Cairo, Luxor, and Aswan — with space for spontaneous mint tea and felucca rides — often beats a packed checklist."]'::jsonb,
 '[{"title":"Pyramids & Sphinx at Sunrise","description":"Arrive early to Giza for softer light, smaller crowds, and the chance to explore the plateau in relative peace."},{"title":"Nile Cruise from Luxor to Aswan","description":"Sail past temples at Edfu and Kom Ombo, stopping to wander columns carved with hieroglyphs still bright after millennia."},{"title":"Red Sea Diving","description":"From Hurghada to Dahab, the Red Sea offers clear water, coral reefs, and world-class diving for all levels."}]'::jsonb,
 'egypt-for-first-timers'),
('turkiye', 'Türkiye', 'Where East Meets West',
 'From Cappadocia''s fairy chimneys to Istanbul''s grand bazaars.',
 'Türkiye Travel Guide — Timeless Guides',
 'Explore Türkiye with local insight: Istanbul bazaars, Cappadocia hot-air balloons, Aegean ruins, and practical travel tips for every region.',
 '["Türkiye is a country of contrasts. In a single trip you can wake to hot-air balloons over Cappadocia, haggle for spices in an Istanbul bazaar, and swim in the turquoise coves of the Aegean coast.","Its cuisine is just as varied — from meze by the Bosphorus to home-cooked kebabs in the southeast. The key is pacing: linger long enough to let the layers reveal themselves."]'::jsonb,
 '[{"title":"Istanbul''s Old City & Bosphorus","description":"Visit the Hagia Sophia, Blue Mosque, and Grand Bazaar, then take a ferry between Europe and Asia for sunset."},{"title":"Cappadocia by Balloon","description":"Book a sunrise balloon flight over fairy chimneys and cave dwellings, then explore underground cities carved by early Christians."},{"title":"Ephesus & the Aegean Coast","description":"Walk the marble streets of Ephesus and relax in a seaside village where the pace slows and the food is fresh."}]'::jsonb,
 'essential-travel-guide-to-turkiye');

INSERT INTO public.books (slug, title, subtitle, amazon_url, meta_title, meta_description, description, details, sort_order) VALUES
('istanbul-for-first-timers','Istanbul for First-Timers','Türkiye''s Culture & Essentials','https://www.amazon.com/Istanbul-First-Timers-Turkiyes-Culture-ebook/dp/B0FXHL554L','Istanbul for First-Timers — Timeless Guides','A practical, culturally rich guide for first-time visitors to Istanbul: neighbourhoods, food, transport, and essential etiquette.','Istanbul for First-Timers is the companion we wish we''d had on our first trip. It balances practical logistics — how to use the Istanbulkart, when to visit the mosques, what to wear — with the deeper cultural context that makes the city unforgettable.','["Neighbourhood-by-neighbourhood walks through Sultanahmet, Beyoğlu, Kadıköy, and the Bosphorus villages","Dining tips from street food to meyhanes, plus a primer on Turkish breakfast","Transport, etiquette, and safety advice from a local perspective","A 7-day starter itinerary for first-time visitors"]'::jsonb, 1),
('essential-travel-guide-to-turkiye','Essential Travel Guide to Türkiye','Cappadocia & Beyond','https://www.amazon.com/Essential-Travel-Guide-Turkiye-Cappadocia-ebook/dp/B0GT2NZLH8','Essential Travel Guide to Türkiye — Timeless Guides','Plan a trip across Türkiye: Istanbul, Cappadocia, the Aegean coast, and beyond. Practical tips and local insight for slow travellers.','This guide moves beyond Istanbul to cover Türkiye''s most rewarding regions. From hot-air balloons over Cappadocia to ancient ruins along the Aegean, it is designed for travellers who want depth without rushing.','["Regional guides to Cappadocia, Ephesus, Pamukkale, Antalya, and the Black Sea coast","Practical advice on domestic flights, buses, and car rental","Cultural notes on Turkish hospitality, dress codes, and regional cuisine","Suggested itineraries for one week and two weeks"]'::jsonb, 2),
('egypt-for-first-timers','Egypt for First-Timers','Ancient Egyptian Essentials','https://www.amazon.com/Egypt-First-Timers-Ancient-Egyptian-ebook/dp/B0GSL9CWZ6','Egypt for First-Timers — Timeless Guides','Everything first-time visitors need for Egypt: Cairo, Luxor, Aswan, Nile cruises, and practical travel advice.','Egypt for First-Timers cuts through the noise and gives you a clear, respectful path through the country''s ancient wonders. It covers what to expect, what to wear, how to handle vendors, and how to build an itinerary that leaves room for wonder.','["Step-by-step planning for Cairo, Luxor, Aswan, and a Nile cruise","Tips on timing, tickets, and avoiding crowds at the major sites","Cultural etiquette and advice for solo travellers and families","A 10-day itinerary for first-time visitors"]'::jsonb, 3),
('paris-for-first-timers','Paris for First-Timers','Essential Culture & Tips','https://www.amazon.com/Paris-First-Timers-Essential-Culture-ebook/dp/B0H21PTJ77','Paris for First-Timers — Timeless Guides','A first-timer''s guide to Paris: arrondissements, dining, museums, and local etiquette. Plan a confident visit with Timeless Guides.','Paris for First-Timers is a practical, affectionate introduction to the city. It helps you choose where to stay, how to order a coffee, which museums to book in advance, and where to find the quiet Paris beyond the postcard.','["Arrondissement-by-arrondissement guide to staying and exploring","Dining tips: cafés, bistros, markets, and how to read a French menu","Museum strategy, day trips, and seasonal events","A 5-day first-timer itinerary"]'::jsonb, 4),
('food-lovers-travel-guide-to-rome','Food Lover''s Travel Guide to Rome','Eat Like a Local','https://www.amazon.com/Food-Lovers-Travel-Guide-Rome-ebook/dp/B0FCF1PYGG','Food Lover''s Travel Guide to Rome — Timeless Guides','Eat your way through Rome like a local. Trastevere, Testaccio, markets, aperitivo, and the dishes that define Roman cuisine.','This is not a list of tourist menus. It is a food lover''s map of Rome, built around the neighbourhoods, markets, and family-run spots where Romans actually eat. Use it to plan meals, snacks, and aperitivo for a trip you''ll taste long after you leave.','["Neighbourhood food walks through Trastevere, Testaccio, and the Jewish Ghetto","Market guides, street food, and where to find the best carbonara and cacio e pepe","Aperitivo culture, wine bars, and gelato worth the queue","A 3-day food-focused itinerary"]'::jsonb, 5),
('barcelona-tourist-traps-to-avoid','Barcelona: Tourist Traps to Avoid','Insider Tips','https://www.amazon.com/Barcelona-Tourist-Traps-Avoid-Insider-ebook/dp/B0GHGM2TCX','Barcelona: Tourist Traps to Avoid — Timeless Guides','See Barcelona''s real character and avoid the tourist traps. Local tips on neighbourhoods, dining, and experiences off the beaten path.','Barcelona is beautiful, but its most famous streets are not always its best. This guide steers you around the tourist traps and toward the restaurants, bars, and neighbourhoods where the city''s real character lives.','["Overrated spots to skip and the local alternatives nearby","Neighbourhood guides to Gràcia, El Born, Poblenou, and Barceloneta","Dining tips for tapas, pintxos, and Catalan wine","A 4-day itinerary focused on authentic Barcelona"]'::jsonb, 6);
