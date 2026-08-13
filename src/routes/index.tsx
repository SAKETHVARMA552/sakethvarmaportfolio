import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Achievements } from "@/components/portfolio/Achievements";
import { Certificates } from "@/components/portfolio/Certificates";
import { Contact } from "@/components/portfolio/Contact";
import { Divider } from "@/components/portfolio/primitives";

const title = "Budde Saketh Varma — Software Engineer, Full Stack & AI/ML";
const description =
  "Portfolio of Budde Saketh Varma: full-stack engineering with React, Node.js and PostgreSQL, machine learning with Python and Scikit-learn, verified internships and credentials.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Static Premium Background */}
      <div 
        aria-hidden 
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 50% -20%, 
                var(--background-2) 0%, 
                var(--surface) 40%,
                var(--background) 75%,
                var(--background) 100%
              )
            `,
          }}
        />

        <div
          className="absolute -left-[15%] -top-[25%] h-[90vmax] w-[90vmax] rounded-full animate-aurora-drift"
          style={{
            background: "radial-gradient(circle, color-mix(in oklch, var(--violet) 35%, transparent) 0%, transparent 70%)",
            filter: "blur(100px)",
            opacity: 0.25,
          }}
        />

        <div
          className="absolute -right-[20%] top-[5%] h-[80vmax] w-[80vmax] rounded-full animate-aurora-drift-2"
          style={{
            background: "radial-gradient(circle, color-mix(in oklch, var(--blue) 30%, transparent) 0%, transparent 70%)",
            filter: "blur(110px)",
            opacity: 0.2,
          }}
        />

        <div
          className="absolute -bottom-[20%] left-[10%] h-[70vmax] w-[70vmax] rounded-full animate-aurora-drift"
          style={{
            background: "radial-gradient(circle, color-mix(in oklch, var(--cyan) 25%, transparent) 0%, transparent 70%)",
            filter: "blur(120px)",
            opacity: 0.15,
          }}
        />

        <div
          className="absolute left-[30%] top-[15%] h-[60vmax] w-[60vmax] rounded-full animate-aurora-drift-2"
          style={{
            background: "radial-gradient(circle, color-mix(in oklch, var(--pink) 20%, transparent) 0%, transparent 70%)",
            filter: "blur(90px)",
            opacity: 0.1,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(70% 60% at 50% 30%, black 0%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(70% 60% at 50% 30%, black 0%, transparent 85%)",
            opacity: 0.5,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 50% 40%, 
                transparent 20%, 
                rgba(0,0,0,0.15) 60%,
                rgba(0,0,0,0.3) 100%
              )
            `,
          }}
        />
      </div>

      <Navbar />
      <main className="animate-in fade-in duration-500">
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Projects />
        <Divider />
        <Experience />
        <Divider />
        <Achievements />
        <Divider />
        <Certificates />
        <Divider />
        <Contact />
      </main>
    </>
  );
}