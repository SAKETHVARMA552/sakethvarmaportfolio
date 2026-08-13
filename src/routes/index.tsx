import { createFileRoute } from "@tanstack/react-router";
import { LiveBackground } from "@/components/portfolio/LiveBackground";
import { PremiumCursor } from "@/components/portfolio/PremiumCursor";
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
      <LiveBackground />
      <PremiumCursor />
      <Navbar />
      <main>
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
