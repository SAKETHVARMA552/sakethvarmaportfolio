import { useEffect, useState } from "react";
import { sections, profile } from "@/data/portfolio";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div
        className={`relative mx-auto mt-3 flex w-[min(100%-1.5rem,72rem)] items-center justify-between gap-3 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled ? "glass" : "border border-transparent bg-transparent"
        }`}
      >
        <a href="#home" className="group flex items-center gap-2.5" aria-label="Go to top">
          <span
            className="grid size-8 place-items-center rounded-lg text-xs font-bold"
            style={{
              background: "linear-gradient(135deg, var(--violet), var(--blue))",
              color: "var(--primary-foreground)",
            }}
          >
            SV
          </span>
          <span className="hidden text-sm font-semibold sm:block">{profile.shortName}</span>
        </a>

        <nav aria-label="Section navigation" className="hidden items-center gap-1 lg:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={`relative rounded-full px-3 py-2 text-[0.8rem] transition-colors ${
                active === s.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
              {active === s.id ? (
                <span
                  className="absolute inset-x-3 -bottom-0.5 h-px"
                  style={{
                    background: "linear-gradient(90deg, var(--violet), var(--cyan))",
                    boxShadow: "0 0 10px var(--cyan)",
                  }}
                />
              ) : null}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base btn-ghost hidden px-4 py-2 text-xs sm:inline-flex"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="btn-base btn-ghost size-11 !p-0 lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className="absolute inset-x-0 top-0 h-px bg-current transition-transform"
                style={{ transform: open ? "translateY(6px) rotate(45deg)" : undefined }}
              />
              <span
                className="absolute inset-x-0 top-1.5 h-px bg-current transition-opacity"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="absolute inset-x-0 top-3 h-px bg-current transition-transform"
                style={{ transform: open ? "translateY(-6px) rotate(-45deg)" : undefined }}
              />
            </span>
          </button>
        </div>

        {scrolled ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-6 bottom-0 h-px overflow-hidden"
          >
            <span
              className="block h-px w-1/3"
              style={{
                background: "linear-gradient(90deg, transparent, var(--cyan), transparent)",
                animation: "nav-sweep 6s linear infinite",
              }}
            />
          </span>
        ) : null}
      </div>

      {open ? (
        <nav
          aria-label="Mobile navigation"
          className="glass mx-auto mt-2 grid w-[min(100%-1.5rem,72rem)] grid-cols-2 gap-1 rounded-2xl p-2 lg:hidden"
        >
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
