import { writeFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://www.timelessguides.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  lastmod?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/connect", changefreq: "weekly", priority: "0.8" },
  { path: "/journal", changefreq: "weekly", priority: "0.9" },
];

function generateSitemap(entries: SitemapEntry[]) {
  const today = new Date().toISOString().split("T")[0];
  const urls = entries.map((e) =>
    [
      "  <url>",
      `    <loc>${BASE_URL}${e.path}</loc>`,
      `    <lastmod>${e.lastmod ?? today}</lastmod>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n")
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
  ].join("\n");
}

async function main() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const dynamicEntries: SitemapEntry[] = [];

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const [postsRes, destRes, booksRes] = await Promise.all([
      supabase.from("posts").select("slug, updated_at").eq("is_published", true),
      supabase.from("destinations").select("slug, updated_at").eq("published", true),
      supabase.from("books").select("slug, updated_at").eq("published", true),
    ]);

    (postsRes.data || []).forEach((p: any) => dynamicEntries.push({
      path: `/journal/${p.slug}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: p.updated_at?.slice(0, 10),
    }));

    (destRes.data || []).forEach((d: any) => dynamicEntries.push({
      path: `/destinations/${d.slug}`,
      changefreq: "weekly",
      priority: "0.8",
      lastmod: d.updated_at?.slice(0, 10),
    }));

    (booksRes.data || []).forEach((b: any) => dynamicEntries.push({
      path: `/books/${b.slug}`,
      changefreq: "weekly",
      priority: "0.7",
      lastmod: b.updated_at?.slice(0, 10),
    }));
  } else {
    console.warn("Missing Supabase env vars; sitemap will omit dynamic content.");
  }

  const entries = [...staticEntries, ...dynamicEntries];
  writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
  console.log(`sitemap.xml written (${entries.length} entries)`);
}

main();
