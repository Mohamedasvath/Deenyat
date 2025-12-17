import { useEffect } from "react";
import gsap from "gsap";

export default function useParallax(ref, strength = 30) {
  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: strength,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);
}
