import { useEffect, useRef } from "react";
import { useAnimation } from "framer-motion";
import Hero from "./hero";
import Me from "./me";
import Nav from "./nav";
import SkillTags from "./skill-tags";
import Project from "./project";
import OpenSource from "./open-source";

export default function Profile() {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        controls.start({ opacity: 1, y: 0 });
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);
  return (
    <div>
      <Nav />
      <Hero />
      <Me />
      <SkillTags />
      <Project />
      <OpenSource />
    </div>
  );
}
