import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_consultation_requests",
  title: "List consultation requests",
  description: "List consultation booking requests. Requires an admin account (RLS protected).",
  inputSchema: {
    limit: z.number().int().min(1).max(100).optional().describe("Max rows to return (default 25)."),
    onlyOpen: z.boolean().optional().describe("If true, only return requests that are not marked handled."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, onlyOpen }, ctx: ToolContext) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated." }], isError: true };
    }
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
      global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    let query = supabase
      .from("consultation_requests")
      .select("id,name,email,offering,travel_dates,preferred_date,message,status,handled,created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 25);
    if (onlyOpen) query = query.eq("handled", false);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { requests: data },
    };
  },
});
