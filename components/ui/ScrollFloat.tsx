"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: string;
  scrollStart?: string;
  scrollEnd?: string;
  ease?: string;
  scrub?: boolean | number;
  containerClassName?: string;
  charClassName?: string;
}

export default function ScrollFloat({
  children,
  scrollStart = "top bottom+=20%",
  scrollEnd = "bottom top+=20%",
  ease = "power2.out",
  scrub = 1.5,
  containerClassName = "",
  charClassName = "",
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll<HTMLElement>(".sf-char");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          willChange: "opacity, transform",
          opacity: 0,
          yPercent: 130,
          scaleX: 1.5,
          scaleY: 0.5,
          skewX: 15,
        },
        {
          ease,
          opacity: 1,
          yPercent: 0,
          scaleX: 1,
          scaleY: 1,
          skewX: 0,
          stagger: 0.02,
          scrollTrigger: {
            trigger: el,
            start: scrollStart,
            end: scrollEnd,
            scrub,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [ease, scrollStart, scrollEnd, scrub]);

  const words = children.split(" ");

  return (
    <div ref={containerRef} className={`w-full flex flex-wrap justify-center items-center ${containerClassName}`}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex overflow-hidden">
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className={`sf-char inline-block ${charClassName}`}
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && (
            <span className="sf-char inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </div>
  );
}
