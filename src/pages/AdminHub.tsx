import { Link } from "react-router-dom";
import AdminShell from "@/components/AdminShell";
import { FileText, Map, BookOpen, QrCode, Inbox, Users } from "lucide-react";

const cards = [
  { to: "/admin/journal", label: "Journal", desc: "Write and manage blog posts.", icon: FileText },
  { to: "/admin/destinations", label: "Destinations", desc: "Edit destination landing pages.", icon: Map },
  { to: "/admin/books", label: "Books", desc: "Edit book pages and Amazon links.", icon: BookOpen },
  { to: "/admin/companions", label: "QR Companions", desc: "Bonus pages for printed guidebooks.", icon: QrCode },
  { to: "/admin/inbox", label: "Consultations", desc: "Read submitted consultation requests.", icon: Inbox },
  { to: "/admin/subscribers", label: "Subscribers", desc: "View and export newsletter signups.", icon: Users },
];

export default function AdminHub() {
  return (
    <AdminShell title="Dashboard">
      <div className="grid md:grid-cols-2 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.to}
              to={c.to}
              className="p-6 border border-border bg-card hover:border-accent transition-colors block"
            >
              <Icon className="w-6 h-6 text-accent mb-4" />
              <h3 className="font-heading text-xl mb-1">{c.label}</h3>
              <p className="font-body text-sm text-muted-foreground">{c.desc}</p>
            </Link>
          );
        })}
      </div>
    </AdminShell>
  );
}
