
import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Me from "./me";
import Nav from "./nav";
import SkillTags from "./skill-tags";
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
      <Me />
      <SkillTags />
    </div>
  )
}