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
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    onScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll,
      );
    };
  }, []);

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter(
              (entry) =>
                entry.isIntersecting,
            )
            .sort(
              (a, b) =>
                b.intersectionRatio -
                a.intersectionRatio,
            )[0];

          if (
            visible?.target.id
          ) {
            setActive(
              visible.target.id,
            );
          }
        },
        {
          rootMargin:
            "-45% 0px -45% 0px",
          threshold: [
            0,
            0.25,
            0.5,
            1,
          ],
        },
      );

    sections.forEach((section) => {
      const element =
        document.getElementById(
          section.id,
        );

      if (element) {
        observer.observe(element);
      }
    });

    return () =>
      observer.disconnect();
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 pointer-events-none"
      style={{
        paddingTop:
          "env(safe-area-inset-top)",
      }}
    >
      <div
        className="mx-auto w-full max-w-6xl px-4 sm:px-6"
      >
        {/* ======================================================
            SIMPLE NAVBAR - No Glass Effect
            ====================================================== */}

        <div
          className={`
            pointer-events-auto
            relative
            mt-4
            flex
            items-center
            justify-between
            gap-4
            rounded-2xl
            px-4
            py-3
            sm:px-6
            sm:py-3.5
            transition-all
            duration-300
            ease-out
            ${
              scrolled
                ? "bg-[#0a0a0f] border border-white/10 shadow-lg"
                : "bg-[#0a0a0f]/90 border border-white/5 shadow-md"
            }
          `}
          style={{
            transform: "translateZ(0)",
            willChange: "transform, background, box-shadow",
          }}
        >
          {/* ====================================================
              BRAND / LOGO
              ==================================================== */}

          <a
            href="#home"
            aria-label="Go to top"
            className="
              group
              flex
              shrink-0
              items-center
              gap-2.5
              transition-transform
              duration-200
              hover:scale-[1.02]
            "
          >
            <span
              className="
                relative
                grid
                size-9
                place-items-center
                rounded-xl
                bg-gradient-to-br
                from-violet-500
                to-blue-500
                text-sm
                font-extrabold
                text-white
                shadow-[0_4px_14px_rgba(99,102,241,0.35)]
                transition-all
                duration-200
                group-hover:shadow-[0_6px_24px_rgba(99,102,241,0.45)]
                group-hover:scale-105
              "
            >
              <span className="relative z-10 tracking-tight">
                SV
              </span>

              <span
                className="
                  absolute
                  inset-[1px]
                  rounded-xl
                  border-t
                  border-white/30
                  pointer-events-none
                "
              />
            </span>

            <span
              className="
                hidden
                text-sm
                font-semibold
                tracking-[-0.01em]
                text-white/90
                sm:block
                transition-opacity
                duration-200
                group-hover:text-white
              "
            >
              {profile.shortName}
            </span>
          </a>

          {/* ====================================================
              DESKTOP NAVIGATION
              ==================================================== */}

          <nav
            aria-label="Section navigation"
            className="
              hidden
              items-center
              gap-1
              md:flex
            "
          >
            {sections.map(
              (section) => {
                const isActive =
                  active ===
                  section.id;

                return (
                  <a
                    key={
                      section.id
                    }
                    href={`#${section.id}`}
                    aria-current={
                      isActive
                        ? "page"
                        : undefined
                    }
                    className={`
                      relative
                      px-3.5
                      py-2
                      text-sm
                      font-medium
                      rounded-full
                      transition-all
                      duration-200
                      ease-out
                      ${
                        isActive
                          ? "text-white bg-white/10"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    {section.label}

                    {isActive && (
                      <span
                        className="
                          absolute
                          bottom-0.5
                          left-1/2
                          h-[2px]
                          w-5
                          -translate-x-1/2
                          rounded-full
                          bg-gradient-to-r
                          from-violet-400
                          to-cyan-400
                          shadow-[0_0_8px_rgba(103,232,249,0.5)]
                        "
                      />
                    )}
                  </a>
                );
              },
            )}
          </nav>

          {/* ====================================================
              ACTIONS
              ==================================================== */}

          <div className="flex items-center gap-2">
            <a
              href={
                profile.resume
              }
              target="_blank"
              rel="noopener noreferrer"
              className="
                hidden
                items-center
                gap-1.5
                rounded-full
                border
                border-white/10
                bg-white/5
                px-4
                py-1.5
                text-sm
                font-medium
                text-white/90
                transition-all
                duration-200
                hover:border-white/20
                hover:bg-white/10
                hover:-translate-y-0.5
                active:scale-[0.96]
                sm:inline-flex
              "
            >
              <span>📄</span>
              Resume
            </a>

            <button
              type="button"
              onClick={() =>
                setOpen(
                  (value) =>
                    !value,
                )
              }
              aria-expanded={open}
              aria-label={
                open
                  ? "Close menu"
                  : "Open menu"
              }
              className="
                relative
                flex
                size-10
                flex-col
                items-center
                justify-center
                gap-1
                rounded-full
                border
                border-white/8
                bg-white/5
                text-white
                transition-all
                duration-200
                hover:bg-white/10
                hover:scale-105
                active:scale-[0.92]
                md:hidden
              "
            >
              <span
                className={`
                  h-[1.5px]
                  w-4
                  rounded-full
                  bg-current
                  transition-all
                  duration-200
                  ease-out
                  ${
                    open
                      ? "rotate-45 translate-y-[5px]"
                      : ""
                  }
                `}
              />

              <span
                className={`
                  h-[1.5px]
                  w-4
                  rounded-full
                  bg-current
                  transition-all
                  duration-200
                  ease-out
                  ${
                    open
                      ? "opacity-0 scale-0"
                      : ""
                  }
                `}
              />

              <span
                className={`
                  h-[1.5px]
                  w-4
                  rounded-full
                  bg-current
                  transition-all
                  duration-200
                  ease-out
                  ${
                    open
                      ? "-rotate-45 -translate-y-[5px]"
                      : ""
                  }
                `}
              />
            </button>
          </div>
        </div>

        {/* ======================================================
            MOBILE MENU
            ====================================================== */}

        {open && (
          <nav
            aria-label="Mobile navigation"
            className="
              pointer-events-auto
              mt-2
              grid
              grid-cols-2
              gap-1.5
              rounded-2xl
              border
              border-white/10
              bg-[#0a0a0f]
              p-2
              shadow-[0_20px_50px_rgba(0,0,0,0.5)]
              md:hidden
              animate-in
              slide-in-from-top-4
              duration-200
            "
            style={{
              transform: "translateZ(0)",
            }}
          >
            {sections.map(
              (section) => {
                const isActive =
                  active ===
                  section.id;

                return (
                  <a
                    key={
                      section.id
                    }
                    href={`#${section.id}`}
                    onClick={() =>
                      setOpen(false)
                    }
                    className={`
                      rounded-xl
                      px-3
                      py-2.5
                      text-sm
                      font-medium
                      text-center
                      transition-all
                      duration-150
                      ${
                        isActive
                          ? "text-white bg-white/10"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    {section.label}
                  </a>
                );
              },
            )}

            <a
              href={
                profile.resume
              }
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                setOpen(false)
              }
              className="
                col-span-2
                rounded-xl
                px-3
                py-2.5
                text-sm
                font-medium
                text-center
                text-white/80
                transition-all
                duration-150
                hover:bg-white/5
                hover:text-white
              "
            >
              📄 Resume
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}