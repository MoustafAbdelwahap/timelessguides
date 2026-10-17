import { supabase } from "@/integrations/supabase/client";

export interface Experience {
  title: string;
  description: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  short_description: string;
  meta_title: string;
  meta_description: string;
  intro: string[];
  experiences: Experience[];
  book_slug: string | null;
  hero_image_url: string | null;
  published: boolean;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  amazon_url: string;
  meta_title: string;
  meta_description: string;
  description: string;
  details: string[];
  cover_image_url: string | null;
  published: boolean;
  sort_order: number;
}

export interface CompanionSection {
  type: "text" | "link-list" | "map" | "tip";
  title?: string;
  body?: string;
  mapUrl?: string;
  links?: { label: string; url: string }[];
}

export interface BookCompanion {
  id: string;
  book_slug: string;
  title: string;
  intro: string;
  sections: CompanionSection[];
}

const parseJsonArray = <T,>(value: unknown): T[] => {
  if (Array.isArray(value)) return value as T[];
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed as T[]) : [];
    } catch {
      return [];
    }
  }
  return [];
};

const mapDestination = (row: any): Destination => ({
  ...row,
  intro: parseJsonArray<string>(row.intro),
  experiences: parseJsonArray<Experience>(row.experiences),
});

const mapBook = (row: any): Book => ({
  ...row,
  details: parseJsonArray<string>(row.details),
});

const mapCompanion = (row: any): BookCompanion => ({
  ...row,
  sections: parseJsonArray<CompanionSection>(row.sections),
});

export async function fetchDestinations(): Promise<Destination[]> {
  const { data } = await supabase
    .from("destinations")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: true });
  return (data || []).map(mapDestination);
}

export async function fetchDestinationBySlug(slug: string): Promise<Destination | null> {
  const { data } = await supabase.from("destinations").select("*").eq("slug", slug).maybeSingle();
  return data ? mapDestination(data) : null;
}

export async function fetchBooks(): Promise<Book[]> {
  const { data } = await supabase
    .from("books")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  return (data || []).map(mapBook);
}

export async function fetchBookBySlug(slug: string): Promise<Book | null> {
  const { data } = await supabase.from("books").select("*").eq("slug", slug).maybeSingle();
  return data ? mapBook(data) : null;
}

export async function fetchCompanionBySlug(bookSlug: string): Promise<BookCompanion | null> {
  const { data } = await supabase
    .from("book_companions")
    .select("*")
    .eq("book_slug", bookSlug)
    .maybeSingle();
  return data ? mapCompanion(data) : null;
}

export { mapDestination, mapBook, mapCompanion };
