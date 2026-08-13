import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";
import { Reveal } from "./primitives";

const phrases = [
  "Software Engineer",
  "Full Stack Developer",
  "AI/ML Enthusiast",
  "Problem Solver",
];

const layers = [
  {
    label: "Frontend",
    tech: "React.js",
    accent: "var(--cyan)",
  },
  {
    label: "API",
    tech: "REST • JWT",
    accent: "var(--blue)",
  },
  {
    label: "Backend",
    tech: "Node.js • Express",
    accent: "var(--indigo)",
  },
  {
    label: "Database",
    tech: "PostgreSQL • Prisma",
    accent: "var(--violet)",
  },
  {
    label: "AI / ML",
    tech: "Scikit-learn • Pandas",
    accent: "var(--magenta)",
  },
];

export function Hero() {
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[loopIndex % phrases.length];

    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          setTypedText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (charIndex > 0) {
          setTypedText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setLoopIndex((prev) => prev + 1);
        }
      }
    }, !isDeleting && charIndex >= currentPhrase.length ? 1500 : isDeleting ? 40 : 80);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [charIndex, isDeleting, loopIndex]);

  return (
    <section id="home" className="relative scroll-mt-24">
      <div
        className="mx-auto flex w-full max-w-6xl flex-col justify-center px-5 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8"
        style={{ minHeight: "min(100svh, 900px)" }}
      >
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left Column */}
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-2">
                <span className="inline-block size-2 animate-pulse rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                Software Engineering • Full Stack • AI &amp; ML
              </p>
            </Reveal>

            {/* Name */}
            <Reveal delay={90}>
              <h1 className="mt-5 text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
                <span
                  className="bg-gradient-to-r from-violet-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(100deg, #c084fc, #22d3ee, #60a5fa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  SAKETH VARMA
                </span>
              </h1>
            </Reveal>

            {/* Typing Effect */}
            <Reveal delay={130}>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  I'm a
                </span>

                <span className="min-h-[2rem] text-lg font-semibold text-cyan-400 sm:text-xl">
                  {typedText}
                  <span className="ml-1 inline-block h-5 w-0.5 animate-pulse bg-cyan-400" />
                </span>
              </div>
            </Reveal>

            {/* Description */}
            <Reveal delay={170}>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                I'm {profile.name} — a B.Tech CSE (AI &amp; ML) student building
                full-stack applications and machine learning systems. Java,
                Python, JavaScript, React.js, Node.js, PostgreSQL and REST APIs,
                applied through internships and academic projects.
              </p>
            </Reveal>

            {/* Buttons */}
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="btn-base btn-primary group"
                >
                  <span>View Projects</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <a
                  href={profile.resume}
                  download={profile.resumeFilename}
                  className="btn-base btn-ghost"
                >
                  Download Resume
                </a>

                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-base btn-ghost hidden sm:inline-flex"
                >
                  View Resume
                </a>
              </div>
            </Reveal>

            {/* Statistics */}
            <Reveal delay={320}>
              <dl className="mt-10 flex flex-wrap gap-3">
                {[
                  {
                    k: "CGPA",
                    v: "7.98",
                    icon: "🎯",
                  },
                  {
                    k: "Internships",
                    v: "4",
                    icon: "💼",
                  },
                  {
                    k: "Credentials",
                    v: "17",
                    icon: "🏆",
                  },
                ].map((stat) => (
                  <div
                    key={stat.k}
                    className="glass glass-panel flex min-w-[100px] items-center gap-3 px-4 py-3"
                  >
                    <span className="text-xl">{stat.icon}</span>

                    <div>
                      <dt className="eyebrow text-[0.6rem]">
                        {stat.k}
                      </dt>

                      <dd className="font-display text-xl font-semibold">
                        {stat.v}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right Column - System Architecture */}
          <div className="mt-12 lg:mt-20">
            <Reveal delay={200}>
              <div className="glass glass-panel relative p-5 sm:p-6">
                <p className="eyebrow mb-4 flex items-center gap-2">
                  <span className="inline-block size-1.5 animate-pulse rounded-full bg-green-400" />
                  System architecture
                </p>

                <ul className="space-y-0">
                  {layers.map((layer, index) => (
                    <li key={layer.label}>
                      <div
                        className="flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          borderColor: `color-mix(in oklch, ${layer.accent} 28%, transparent)`,
                          background: `color-mix(in oklch, ${layer.accent} 7%, transparent)`,
                        }}
                      >
                        <span className="text-sm font-medium">
                          {layer.label}
                        </span>

                        <span className="font-mono text-[0.68rem] text-muted-foreground">
                          {layer.tech}
                        </span>
                      </div>

                      {index < layers.length - 1 && (
                        <div className="relative mx-auto h-8 w-px overflow-hidden bg-white/10">
                          <span
                            className="absolute inset-x-[-1px] top-0 h-3 rounded-full"
                            style={{
                              background: `linear-gradient(to bottom, transparent, ${layer.accent})`,
                              animation: `pulse-line 3.2s ${
                                index * 0.55
                              }s ease-in-out infinite`,
                            }}
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}