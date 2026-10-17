import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import ConnectWithLocals from "./pages/ConnectWithLocals";
import Journal from "./pages/Journal";
import JournalPost from "./pages/JournalPost";
import AdminJournal from "./pages/AdminJournal";
import AdminHub from "./pages/AdminHub";
import AdminDestinations from "./pages/AdminDestinations";
import AdminBooks from "./pages/AdminBooks";
import AdminCompanions from "./pages/AdminCompanions";
import AdminInbox from "./pages/AdminInbox";
import AdminSubscribers from "./pages/AdminSubscribers";
import DestinationPage from "./pages/DestinationPage";
import BookPage from "./pages/BookPage";
import CompanionPage from "./pages/CompanionPage";
import AdminLogin from "./pages/AdminLogin";
import ResetPassword from "./pages/ResetPassword";
import OAuthConsent from "./pages/OAuthConsent";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }, [pathname, hash]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/connect" element={<ConnectWithLocals />} />
          <Route path="/consultation" element={<ConnectWithLocals />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<JournalPost />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
          <Route path="/admin" element={<AdminHub />} />
          <Route path="/admin/journal" element={<AdminJournal />} />
          <Route path="/admin/destinations" element={<AdminDestinations />} />
          <Route path="/admin/books" element={<AdminBooks />} />
          <Route path="/admin/companions" element={<AdminCompanions />} />
          <Route path="/admin/companions/:bookSlug" element={<AdminCompanions />} />
          <Route path="/admin/inbox" element={<AdminInbox />} />
          <Route path="/admin/subscribers" element={<AdminSubscribers />} />
          <Route path="/destinations/:slug" element={<DestinationPage />} />
          <Route path="/books/:slug" element={<BookPage />} />
          <Route path="/companion/:bookSlug" element={<CompanionPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
