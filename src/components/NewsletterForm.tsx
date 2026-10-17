import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const emailSchema = z
  .string()
  .trim()
  .email({ message: "Please enter a valid email address." })
  .max(255, { message: "Email is too long." });

type Variant = "compact" | "featured";

interface NewsletterFormProps {
  source: string;
  variant?: Variant;
  className?: string;
}

const NewsletterForm = ({ source, variant = "compact", className }: NewsletterFormProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setStatus("error");
      setMessage(parsed.error.issues[0]?.message ?? "Invalid email.");
      return;
    }

    setStatus("loading");
    setMessage("");

    const { error } = await supabase
      .from("subscribers")
      .insert({ email: parsed.data.toLowerCase(), source });

    // Treat duplicate emails as success (Postgres unique violation code 23505)
    if (error && error.code !== "23505") {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
      return;
    }

    setStatus("success");
    setMessage("Thank you — you're on the list.");
    setEmail("");
  };

  const isFeatured = variant === "featured";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full",
        isFeatured ? "max-w-xl mx-auto" : "max-w-sm",
        className,
      )}
      noValidate
    >
      <div className={cn("flex gap-2", isFeatured ? "flex-col sm:flex-row" : "flex-col sm:flex-row")}>
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-label="Email address"
          disabled={status === "loading"}
          className={cn(
            "flex-1 font-body",
            isFeatured
              ? "h-12 bg-background border-border text-foreground"
              : "h-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40",
          )}
        />
        <Button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "font-body tracking-wide",
            isFeatured
              ? "h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90"
              : "h-10 bg-accent text-accent-foreground hover:bg-accent/90",
          )}
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </Button>
      </div>
      {message && (
        <p
          className={cn(
            "mt-3 text-sm font-body",
            status === "success"
              ? isFeatured
                ? "text-foreground/80"
                : "text-primary-foreground/80"
              : "text-destructive",
          )}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default NewsletterForm;
