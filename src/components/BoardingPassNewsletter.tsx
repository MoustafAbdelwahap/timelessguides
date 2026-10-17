import { useState, useEffect, useMemo } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { fetchDestinations } from "@/lib/content";

const emailSchema = z
  .string()
  .trim()
  .email({ message: "Please enter a valid email address." })
  .max(255, { message: "Email is too long." });

interface DestinationCity {
  city: string;
  code: string;
}

const DEFAULT_CITIES: DestinationCity[] = [
  { city: "Rome", code: "FCO" },
  { city: "Istanbul", code: "IST" },
  { city: "Cappadocia", code: "NAV" },
  { city: "Cairo", code: "CAI" },
  { city: "Türkiye", code: "TUR" },
  { city: "Egypt", code: "EGY" },
];

export default function BoardingPassNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const [originCity, setOriginCity] = useState("Your City");
  const [originCode, setOriginCode] = useState("DEP");
  const [cities, setCities] = useState<DestinationCity[]>(DEFAULT_CITIES);
  const [destIndex, setDestIndex] = useState(0);

  // 1. Silent IP-based location lookup (zero permission prompts)
  useEffect(() => {
    fetch("https://ipwho.is/")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.city) {
          setOriginCity(data.city);
          const code = (data.city.slice(0, 3) || data.country_code || "DEP").toUpperCase();
          setOriginCode(code);
        }
      })
      .catch(() => {
        // Fallback silently without throwing or blocking
      });
  }, []);

  // 2. Fetch all website destinations dynamically from backend/database
  useEffect(() => {
    fetchDestinations()
      .then((data) => {
        if (data && data.length > 0) {
          const mapped = data.map((d) => ({
            city: d.name,
            code: (d.slug.slice(0, 3) || "TG").toUpperCase(),
          }));
          // Merge unique cities
          const combined = [...DEFAULT_CITIES];
          mapped.forEach((m) => {
            if (!combined.some((c) => c.city.toLowerCase() === m.city.toLowerCase())) {
              combined.push(m);
            }
          });
          setCities(combined);
        }
      })
      .catch(() => {});
  }, []);

  // 3. Automatically cycle through every destination on the website
  useEffect(() => {
    const timer = setInterval(() => {
      setDestIndex((prev) => (prev + 1) % cities.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [cities.length]);

  const currentDest = cities[destIndex] || DEFAULT_CITIES[0];

  // Dynamically extract name from email or default to "You"
  const passengerName = useMemo(() => {
    if (!email) return "You";
    const namePart = email.split("@")[0].replace(/[._-]/g, " ").trim();
    return namePart
      ? namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase()
      : "You";
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setStatus("error");
      setMessage(parsed.error.issues[0]?.message ?? "Invalid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const { error } = await supabase
        .from("subscribers")
        .insert({
          email: parsed.data.toLowerCase(),
          source: `boarding_pass_${originCity.toLowerCase()}`,
        });

      if (error && error.code !== "23505") {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("You're on the list! We just sent your free guidebook preview to your inbox.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <>
      {/* Wave transition into Boarding Pass */}
      <div className="wave up" style={{ color: "var(--sand2)" }}>
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
          <path
            fill="currentColor"
            d="M0 -1H1200V44C1050 74 880 14 650 40S250 74 0 36Z"
          />
        </svg>
      </div>

      <section className="exp" id="newsletter">
        <span id="experiences" />
        <div className="wrap">
          <div className="tkw">
            <div className="tk">
              {/* Cool Passenger Airplane Circling the Corner */}
              <div className="tk-plane-orbit" aria-hidden="true">
                <svg viewBox="0 0 160 160" className="tk-plane-orbit-svg">
                  <defs>
                    <linearGradient id="plane-orbit-trail" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c9a25a" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#dbb66e" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#c9a25a" stopOpacity="0.05" />
                    </linearGradient>
                    <filter id="plane-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.35" />
                    </filter>
                  </defs>

                  {/* Smooth curved flight orbit looping around the corner */}
                  <path
                    id="corner-orbit-path"
                    d="M 80,24 C 130,24 146,58 140,94 C 134,130 98,142 66,136 C 30,128 18,96 28,62 C 38,28 64,24 80,24 Z"
                    fill="none"
                    stroke="url(#plane-orbit-trail)"
                    strokeWidth="1.6"
                    strokeDasharray="4 4"
                    className="tk-orbit-trail"
                  />

                  {/* Circling Passenger Airplane */}
                  <g filter="url(#plane-glow)">
                    <animateMotion
                      dur="6.5s"
                      repeatCount="indefinite"
                      rotate="auto"
                    >
                      <mpath href="#corner-orbit-path" />
                    </animateMotion>
                    <g transform="scale(0.85) translate(-12, -12)">
                      <path
                        transform="rotate(90 12 12)"
                        d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                        fill="#c9a25a"
                        stroke="#fff"
                        strokeOpacity="0.9"
                        strokeWidth="0.8"
                      />
                    </g>
                  </g>
                </svg>
              </div>

              {/* Left Ticket Main */}
              <div className="tk-m">
                <div className="tk-h">
                  <span className="tk-h-route">
                    Boarding pass • {originCode} ({originCity}) ✈{" "}
                    <span className="tk-dest-flip" key={currentDest.city}>
                      {currentDest.city} ({currentDest.code})
                    </span>
                  </span>
                  <svg width="22" height="22" viewBox="0 0 24 24">
                    <path
                      transform="rotate(90 12 12)"
                      d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                      fill="#c9a25a"
                    />
                  </svg>
                </div>

                <h2>Travel like you actually live there</h2>
                <p className="tk-desc">
                  Free sample chapters from our books, hidden restaurants our writers
                  swear by, and first access to 1-on-1 consultations with locals before your next trip.
                </p>

                {/* Email Signup Form */}
                <form className="tk-form-box" onSubmit={handleSubmit} noValidate>
                  <input
                    type="email"
                    className="tk-input"
                    placeholder="Enter your email for free chapters & secret spots..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading" || status === "success"}
                    aria-label="Email Address"
                    required
                  />

                  <button
                    type="submit"
                    className="tk-submit-btn"
                    disabled={status === "loading" || status === "success"}
                  >
                    {status === "loading" ? (
                      "Sending…"
                    ) : status === "success" ? (
                      "✓ Pass Sent"
                    ) : (
                      <>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          style={{ transform: "rotate(90deg)" }}
                        >
                          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                        </svg>
                        Get Free Chapter & Tips
                      </>
                    )}
                  </button>
                </form>

                {message && (
                  <p
                    style={{
                      marginTop: "10px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: status === "success" ? "#2d6a4f" : "#b91c1c",
                    }}
                    role={status === "error" ? "alert" : "status"}
                  >
                    {message}
                  </p>
                )}
              </div>

              {/* Right Ticket Stub */}
              <div className="tk-s">
                <div>
                  <small>Passenger</small>
                  <b>{passengerName}</b>
                </div>
                <div>
                  <small>From</small>
                  <b>{originCity}</b>
                </div>
                <div>
                  <small>To Destination</small>
                  <b className="tk-dest-flip" key={`stub-${currentDest.city}`}>
                    {currentDest.city} ({currentDest.code})
                  </b>
                </div>
                <div>
                  <small>Flight</small>
                  <b>TG 2026</b>
                </div>
                <div>
                  <small>Seat</small>
                  <b>Window 1A</b>
                </div>
                <i className="bar" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
