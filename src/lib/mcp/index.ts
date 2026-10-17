import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listJournalPosts from "./tools/list_journal_posts";
import getJournalPost from "./tools/get_journal_post";
import listDestinations from "./tools/list_destinations";
import listBooks from "./tools/list_books";
import listConsultationRequests from "./tools/list_consultation_requests";
import createConsultationRequest from "./tools/create_consultation_request";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "timeless-guides-mcp",
  title: "Timeless Guides",
  version: "0.1.0",
  instructions:
    "Tools for the Timeless Guides travel site. Read published journal posts, destinations, and books, and (for admins) manage consultation requests.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    listJournalPosts,
    getJournalPost,
    listDestinations,
    listBooks,
    listConsultationRequests,
    createConsultationRequest,
  ],
});
