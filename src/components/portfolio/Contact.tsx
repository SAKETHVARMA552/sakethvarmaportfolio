import { profile } from "@/data/portfolio";
import { Reveal, Section, SectionHeading } from "./primitives";

export function Contact() {
  const links = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, accent: "var(--cyan)" },
    { label: "Phone", value: profile.phone, href: `tel:${profile.phone}`, accent: "var(--blue)" },
    {
      label: "LinkedIn",
      value: "saketh-varma-285633357",
      href: profile.linkedin,
      accent: "var(--indigo)",
    },
    { label: "GitHub", value: "SAKETHVARMA552", href: profile.github, accent: "var(--violet)" },
  ];

  return (
    <Section id="contact" glow={["var(--cyan)", "var(--violet)"]}>
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something"
        description="Open to entry-level software engineering roles and internships."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {links.map((l, i) => (
          <Reveal key={l.label} delay={i * 60}>
            <a
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="card-interactive glass glass-panel sheen flex h-full items-center justify-between gap-4 p-5"
              style={{ ["--card-accent" as string]: l.accent }}
            >
              <span>
                <span className="eyebrow block">{l.label}</span>
                <span className="mt-1.5 block break-all text-sm">{l.value}</span>
              </span>
              <span aria-hidden style={{ color: l.accent }}>
                →
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200} className="mt-10 flex flex-wrap gap-3">
        <a href={`mailto:${profile.email}`} className="btn-base btn-primary">
          Email me
        </a>
        <a
          href={profile.resume}
          download={profile.resumeFilename}
          className="btn-base btn-ghost"
        >
          Download Resume
        </a>
      </Reveal>

      <footer className="mt-16 border-t pt-8" style={{ borderColor: "var(--border)" }}>
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name} — {profile.location}
        </p>
      </footer>
    </Section>
  );
}
