import { useState } from "react";
import { profile } from "@/data/portfolio";
import { Reveal, Section, SectionHeading } from "./primitives";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const links = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, accent: "var(--cyan)", icon: "✉️" },
    { label: "Phone", value: profile.phone, href: `tel:${profile.phone}`, accent: "var(--blue)", icon: "📱" },
    {
      label: "LinkedIn",
      value: "saketh-varma-285633357",
      href: profile.linkedin,
      accent: "var(--indigo)",
      icon: "💼",
    },
    { label: "GitHub", value: "SAKETHVARMA552", href: profile.github, accent: "var(--violet)", icon: "🐙" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" glow={["var(--cyan)", "var(--violet)"]}>
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something"
        description="Open to entry-level software engineering roles and internships."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Contact Links */}
        <div className="space-y-4">
          {links.map((l, i) => (
            <Reveal key={l.label} delay={i * 60}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="card-interactive glass glass-panel sheen flex items-center gap-4 p-5 transition-all duration-300 hover:-translate-y-1"
                style={{ ["--card-accent" as string]: l.accent }}
              >
                <span className="text-2xl">{l.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className="eyebrow block">{l.label}</span>
                  <span className="mt-1 block truncate text-sm">{l.value}</span>
                </div>
                <span aria-hidden style={{ color: l.accent }} className="text-lg">
                  →
                </span>
              </a>
            </Reveal>
          ))}

          <Reveal delay={240} className="flex flex-wrap gap-3 pt-4">
            <a href={`mailto:${profile.email}`} className="btn-base btn-primary flex-1 sm:flex-none">
              <span>✉️</span> Email me
            </a>
            <a
              href={profile.resume}
              download={profile.resumeFilename}
              className="btn-base btn-ghost flex-1 sm:flex-none"
            >
              <span>📄</span> Download Resume
            </a>
          </Reveal>
        </div>

        {/* Contact Form */}
        <Reveal delay={100}>
          <form onSubmit={handleSubmit} className="glass glass-panel p-6 space-y-4">
            <p className="eyebrow">Send a message</p>
            
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                Your name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border px-4 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  background: "var(--glass)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                Your email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border px-4 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  background: "var(--glass)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
                placeholder="john@example.com"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-xl border px-4 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2 resize-none"
                style={{
                  background: "var(--glass)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-base btn-primary w-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block size-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  Sending...
                </span>
              ) : (
                "Send Message →"
              )}
            </button>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400 animate-in fade-in duration-300">
                ✅ Message sent successfully! I'll get back to you soon.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400 animate-in fade-in duration-300">
                ❌ Something went wrong. Please try again or email me directly.
              </div>
            )}
          </form>
        </Reveal>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t pt-8" style={{ borderColor: "var(--border)" }}>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name} — {profile.location}
          </p>
          <div className="flex gap-4">
            <a href="#home" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </Section>
  );
}