"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/src/lib/gsapConfig";

type AnnotatedWordProps = {
  children: React.ReactNode;
  variant: "circle" | "underline" | "wave";
  color: string;
  className?: string;
  delay?: number;
  duration?: number;
};

const CIRCLE_PATH =
  "M8 30C10 13 28 6 53 5C77 4 96 12 102 28C106 45 90 56 61 58C30 60 10 50 8 30Z";
const UNDERLINE_PATH =
  "M4 18C12 9 21 9 29 18C37 27 46 27 54 18C62 9 71 9 79 18C87 27 96 27 104 18C112 9 121 9 129 18";
const WAVE_PATH =
  "M1469.132,110.3856c-5.0018-.1157-17.9777,4.9107-25.5027-1.1813-7.525-6.092-14.1567-14.6623-23.5289-16.1317-16.5753-2.5988-28.953,18.1789-45.6245,20.1673-21.4566,2.5592-37.2581-26.3727-58.7901-24.7383-12.4405.9443-21.8464,11.7778-31.7371,19.9031-9.8907,8.1253-25.0406,13.5855-34.0018,4.4153-4.441-4.5446-5.9365-11.4962-9.8664-16.5453-11.3132-14.5352-33.6646-5.7719-47.7822,5.8098-14.1176,11.5818-31.0478,25.9871-47.6036,19.1613-15.778-6.5051-22.8759-30.2308-39.7642-31.6911-14.8952-1.2879-25.0411,15.7354-38.6911,22.2943-13.8323,6.6466-29.9651,1.8859-43.9613-4.2067-13.9962-6.0926-28.3197-13.614-43.4208-12.2359h0c-15.0527,1.4714-27.3764,6.291-41.4025,12.4564-14.0261,6.1654-30.1824,11.0101-43.9824,4.4354-13.6181-6.4881-23.6809-23.4588-38.5826-22.0934-16.8958,1.5481-24.1097,25.311-39.9197,31.8983-16.5894,6.912-33.4494-7.4055-47.5105-18.914-14.0611-11.5085-36.37-20.1556-47.7544-5.5614-3.9547,5.0697-5.4842,12.0291-9.9474,16.5969-9.0061,9.217-24.1295,3.8354-33.9806-4.2385-9.8511-8.0739-19.2041-18.8587-31.6402-19.7383-21.5243-1.5224-37.4675,27.4921-58.9118,25.0444-16.662-1.9018-28.9382-22.6153-45.5265-19.9303-9.3795,1.5182-16.0532,10.1231-23.608,16.2543-2.8216,2.2582-8.0343,6.1324-15.5593.0405-7.525-6.092-14.1567-14.6623-23.5289-16.1317-16.5753-2.5988-28.953,18.1789-45.6245,20.1673-21.4566,2.5592-37.2581-26.3727-58.7901-24.7383-12.4405.9443-21.8464,11.7778-31.7371,19.9031-9.8907,8.1253-25.0406,13.5855-34.0018,4.4153-4.441-4.5446-5.9365-11.4962-9.8664-16.5453-11.3132-14.5352-33.6646-5.7719-47.7822,5.8098-14.1176,11.5818-31.0478,25.9871-47.6036,19.1613-15.778-6.5051-22.8759-30.2308-39.7642-31.6911-14.8952-1.2879-25.0411,15.7354-38.6911,22.2943-13.8323,6.6466-29.9651,1.8859-43.9613-4.2067-13.9962-6.0926-28.3197-13.614-43.4208-12.2359";

export function AnnotatedWord({
  children,
  variant,
  color,
  className = "",
  delay = 0.8,
  duration = 0.95,
}: AnnotatedWordProps) {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const pathRefs = useRef<SVGPathElement[]>([]);

  const setPathRef = (index: number) => (node: SVGPathElement | null) => {
    if (node) {
      pathRefs.current[index] = node;
    }
  };

  useEffect(() => {
    const root = rootRef.current;
    const paths = pathRefs.current.filter(Boolean);
    if (!paths.length || !root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = reduceMotion ? "0" : `${-length}`;
      path.style.opacity = reduceMotion ? "1" : "0.92";
    });

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(paths, {
        strokeDashoffset: 0,
        opacity: 1,
        duration,
        delay,
        ease: "power2.out",
        stagger: paths.length > 1 ? 0.08 : 0,
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, [delay, duration]);

  const decoration =
    variant === "circle" ? (
      <svg
        aria-hidden="true"
        viewBox="0 0 110 64"
        className="pointer-events-none absolute left-[-8%] top-1/2 h-[1.26em] w-[116%] -translate-y-1/2 overflow-visible"
        preserveAspectRatio="none"
      >
        <path
          ref={setPathRef(0)}
          d={CIRCLE_PATH}
          fill="none"
          stroke={color}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : variant === "underline" ? (
      <svg
        aria-hidden="true"
        viewBox="0 0 133 30"
        className="pointer-events-none absolute bottom-[-0.18em] left-[-3%] h-[0.36em] w-[108%] overflow-visible"
        preserveAspectRatio="none"
      >
        <path
          ref={setPathRef(0)}
          d={UNDERLINE_PATH}
          fill="none"
          stroke={color}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg
        aria-hidden="true"
        viewBox="0 0 1500 190.9458"
        className="pointer-events-none absolute bottom-[-0.52em] left-[-8%] h-[1.13em] w-[116%] overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          ref={setPathRef(0)}
          d={WAVE_PATH}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

  return (
    <span ref={rootRef} className={`relative inline-block whitespace-nowrap ${className}`}>
      <span className="relative z-10">{children}</span>
      {decoration}
    </span>
  );
}
