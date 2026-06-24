import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Performances } from "../components/Performances";
import { Concerts } from "../components/Concerts";
import { Recordings } from "../components/Recordings";
import { VideoGallery } from "../components/VideoGallery";
import { SchoolTeaser } from "../components/SchoolTeaser";
import { ProjectsTeaser } from "../components/ProjectsTeaser";
import { Contact } from "../components/Contact";

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Performances />
      <Concerts />
      <Recordings />
      <VideoGallery />
      <SchoolTeaser />
      <ProjectsTeaser />
      <Contact />
    </>
  );
}
