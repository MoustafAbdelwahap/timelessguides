import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "create_consultation_request",
  title: "Create consultation request",
  description: "Submit a new consultation booking request on behalf of the signed-in user.",
  inputSchema: {
    name: z.string().min(1).describe("Traveler's full name."),
    email: z.string().email().describe("Contact email."),
    offering: z.string().min(1).describe("Which offering (e.g. 'Istanbul Consultation')."),
    travel_dates: z.string().optional().describe("Planned travel window, free-form."),
    preferred_date: z.string().optional().describe("Preferred consultation date (ISO date)."),
    message: z.string().optional().describe("Any additional context."),
  },
  annotations: { readOnlyHint: false, openWorldHint: false },
  handler: async (input, ctx: ToolContext) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated." }], isError: true };
    }
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
      global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await supabase
      .from("consultation_requests")
      .insert({
        name: input.name,
        email: input.email,
        offering: input.offering,
        travel_dates: input.travel_dates ?? null,
        preferred_date: input.preferred_date ?? null,
        message: input.message ?? null,
      })
      .select()
      .single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Consultation request created (id ${data.id}).` }],
      structuredContent: { request: data },
    };
  },
});
