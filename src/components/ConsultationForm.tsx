import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is too short").max(100),
  email: z.string().email("Please enter a valid email"),
  travelDates: z.string().max(50).optional(),
  message: z.string().min(20, "Tell us a little more about your trip").max(2000),
});

type FormData = z.infer<typeof schema>;

interface ConsultationFormProps {
  offering?: string;
  buttonText?: string;
}

export default function ConsultationForm({
  offering = "Istanbul Consultation",
  buttonText = "Book Your Consultation",
}: ConsultationFormProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    travelDates: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as keyof FormData] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("consultation_requests").insert({
      name: form.name,
      email: form.email,
      travel_dates: form.travelDates || null,
      message: form.message,
      offering,
    });

    setSubmitting(false);
    if (error) {
      toast.error("Something went wrong. Please try again or email us directly.");
    } else {
      setSuccess(true);
      toast.success("Request sent — we'll be in touch soon!");
      setForm({ name: "", email: "", travelDates: "", message: "" });
    }
  };

  if (success) {
    return (
      <div className="bg-secondary/30 border border-border p-8 text-center">
        <h3 className="font-heading text-2xl mb-3">Thank you</h3>
        <p className="font-body text-muted-foreground leading-relaxed">
          Your consultation request has been sent. We’ll reply within 24 hours with next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="name" className="font-body">Name</Label>
        <Input
          id="name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="font-body"
          placeholder="Your full name"
        />
        {errors.name && <p className="font-body text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email" className="font-body">Email</Label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="font-body"
          placeholder="you@example.com"
        />
        {errors.email && <p className="font-body text-xs text-destructive">{errors.email}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="travelDates" className="font-body">Travel dates (optional)</Label>
        <Input
          id="travelDates"
          value={form.travelDates}
          onChange={(e) => handleChange("travelDates", e.target.value)}
          className="font-body"
          placeholder="e.g., 15–22 September 2026"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message" className="font-body">Tell us about your trip</Label>
        <Textarea
          id="message"
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className="font-body min-h-[140px]"
          placeholder="What kind of experience are you looking for? Any must-sees or dietary needs?"
        />
        {errors.message && <p className="font-body text-xs text-destructive">{errors.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="font-body text-sm uppercase tracking-[0.2em] px-8 py-5 h-auto"
      >
        {submitting ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Send className="w-4 h-4 mr-2" />
        )}
        {buttonText}
      </Button>
    </form>
  );
}
