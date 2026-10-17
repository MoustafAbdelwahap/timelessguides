import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

export default function FloatingBookingCTA() {
  return (
    <Link
      to="/connect"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 bg-accent text-accent-foreground font-body text-xs uppercase tracking-[0.15em] px-5 py-3 shadow-lg hover:bg-accent/90 transition-colors"
      aria-label="Book an Istanbul consultation"
    >
      <Calendar className="w-4 h-4" />
      Book Consultation
    </Link>
  );
}
