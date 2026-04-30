"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  HERO_CONTENT_CLASS,
  HERO_FRAME_CLASS,
  HERO_H1_BASE_CLASS,
  HERO_HEADER_CLASS,
  HERO_SECTION_CLASS,
} from "@/lib/hero-layout";
import { immobili } from "@/lib/immobili";
import { useUltraPremiumTextReveal } from "@/lib/text-reveal";
import { gsap } from "@/src/lib/gsapConfig";

const featureLinks = [
  { label: "Percorsi", bgClassName: "bg-[#4d1b11]", textClassName: "text-white", href: "/immobili", labelWeightClassName: "font-medium" },
  { label: "Servizi", bgClassName: "bg-[#c04131]", textClassName: "text-white", href: "/servizi" },
  {
    label: "Formazione",
    bgClassName: "bg-[#c9dbe8]",
    textClassName: "text-[var(--foreground)]",
    href: "/formazione",
  },
  { label: "Contatti", bgClassName: "bg-[#eae3dc]", textClassName: "text-[var(--foreground)]" },
];

const HERO_RIBBON_HEIGHT = 188;
const STICKY_RIBBON_HEIGHT = 28;
const RIBBON_SCROLL_RANGE = 340;

function PillButton({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light" | "tinted";
}) {
  const toneClassName =
    tone === "dark"
      ? "btn-pill-primary"
      : tone === "tinted"
        ? "btn-pill-accent"
        : "btn-pill-outline";

  return (
    <button
      type="button"
      className={`btn-pill ${toneClassName}`}
    >
      {children}
    </button>
  );
}

function ArrowMark({ light = false }: { light?: boolean }) {
  return (
    <img
      aria-hidden="true"
      src="/icons/freccia.svg"
      alt=""
      className={`block h-auto w-28 ${light ? "brightness-0 invert" : ""}`}
    />
  );
}

function PlaceholderVisual({
  className = "",
  reveal = false,
}: {
  className?: string;
  reveal?: boolean;
}) {
  return (
    <div
      className={`img-zoom relative overflow-hidden rounded-[14px] bg-[#d7d7d7] ${className}`}
      data-fade-media={reveal ? "true" : undefined}
    >
      <div className="img-zoom-inner absolute inset-0 bg-[linear-gradient(140deg,transparent_49.7%,#4c4c4c_50%,transparent_50.3%)]" />
    </div>
  );
}

function PropertyCard({
  slug,
  title,
  year,
  status,
  large,
  align = "start",
}: {
  slug: string;
  title: string;
  year: string;
  status: string;
  large: boolean;
  align?: "start" | "end" | "center";
}) {
  const alignClass =
    align === "center" ? "mx-auto" : align === "end" ? "ml-auto" : "";

  if (large) {
    return (
      <Link
        href={`/immobili/${slug}`}
        className={`portfolio-card group no-lift block w-full max-w-[66rem] space-y-5 ${alignClass}`}
        style={{ willChange: "transform, opacity" }}
      >
        <PlaceholderVisual reveal className="aspect-[1.56/1] w-full" />
        <div className="grid w-full gap-4 lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start">
          <div className="pt-2 transition-transform duration-200 group-hover:translate-x-1">
            <ArrowMark />
          </div>
          <div className="grid w-full gap-3">
            <div className="flex items-end justify-between gap-4 border-b border-[#646464] pb-3">
              <h3 className="text-[16px] font-semibold leading-normal tracking-[0em] text-[#151515]">{title}</h3>
              <span className="text-[16px] font-semibold leading-normal tracking-[0em] text-[#151515]">{year}</span>
            </div>
            <p className="text-[16px] font-normal leading-[22px] tracking-[0em] text-[#161616]">{status}</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/immobili/${slug}`}
      className={`portfolio-card group no-lift block w-full max-w-[42rem] space-y-5 ${alignClass}`}
      style={{ willChange: "transform, opacity" }}
    >
      <PlaceholderVisual reveal className="aspect-[1.67/1] w-full" />
      <div className="grid w-full gap-4 lg:grid-cols-[9.5rem_minmax(0,1fr)] lg:items-start">
        <div className="pt-2 transition-transform duration-200 group-hover:translate-x-1">
          <ArrowMark />
        </div>
        <div className="grid w-full gap-3 pl-3">
          <div className="flex items-end justify-between gap-4 border-b border-[#646464] pb-3">
            <h3 className="text-[16px] font-semibold leading-normal tracking-[0em] text-[#151515]">{title}</h3>
            <span className="text-[16px] font-semibold leading-normal tracking-[0em] text-[#151515]">{year}</span>
          </div>
          <p className="text-[16px] font-normal leading-[22px] tracking-[0em] text-[#161616]">{status}</p>
        </div>
      </div>
    </Link>
  );
}

function FeatureRibbon({ progress }: { progress: number }) {
  const compactMode = progress > 0.92;
  const textOpacity = Math.max(1 - progress * 1.45, 0);
  const arrowOpacity = Math.max(1 - progress * 2.4, 0);
  const labelTranslate = progress * -18;

  return (
    <div className="grid h-full w-full md:grid-cols-2 xl:grid-cols-4">
      {featureLinks.map((item) => (
        <article
          key={item.label}
          className={`group relative h-full overflow-visible ${item.textClassName}`}
        >
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-full origin-bottom ${item.bgClassName} transition-transform duration-300 ease-out group-hover:scale-y-[1.115]`}
          />
          {item.href ? (
            <Link href={item.href} className="absolute inset-0 z-20 block" aria-label={item.label} />
          ) : null}
          {compactMode ? (
            <div className="absolute inset-x-0 bottom-0 h-full">
              <div
                className={`absolute inset-x-0 bottom-0 h-full ${item.bgClassName} transition-[height] duration-300 ease-out group-hover:h-[76px]`}
              />
              <div className="relative z-10 h-full">
                <div className="flex h-full items-center px-8">
                  <span className={`pointer-events-none text-[30px] ${item.labelWeightClassName ?? "font-medium"} leading-[28px] tracking-[0em] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100`}>
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="relative z-10 flex h-full flex-col justify-center px-8 py-[26px]"
              style={{ gap: `${50 - progress * 30}px` }}
            >
              <h2
                className={`text-[30px] ${item.labelWeightClassName ?? "font-medium"} leading-[28px] tracking-[0em] transition-opacity duration-200 ease-out`}
                style={{
                  opacity: textOpacity,
                  transform: `translateY(${labelTranslate}px)`,
                }}
              >
                {item.label}
              </h2>
              <div
                className="transition-opacity duration-150 ease-out"
                style={{ opacity: arrowOpacity }}
              >
                <ArrowMark light={item.textClassName === "text-white"} />
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

export default function ImmobiliPage() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement | null>(null);
  const portfolioRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(heroTitleRef.current, {
        y: 36,
        opacity: 0,
        duration: 0.9,
      }).from(
        heroSubtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.82,
          ease: "power2.out",
        },
        "-=0.55",
      );
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !portfolioRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".portfolio-card");
      if (!cards.length) return;

      gsap.fromTo(
        cards,
        {
          y: 30,
          autoAlpha: 0,
          force3D: true,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.02,
          ease: "power2.out",
          stagger: 0.14,
          clearProps: "willChange",
          scrollTrigger: {
            trigger: portfolioRef.current,
            start: "top 86%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    }, portfolioRef);

    return () => {
      ctx.revert();
    };
  }, []);

  useUltraPremiumTextReveal();

  const ribbonProgress = Math.min(scrollY / RIBBON_SCROLL_RANGE, 1);
  const ribbonHeight =
    HERO_RIBBON_HEIGHT - (HERO_RIBBON_HEIGHT - STICKY_RIBBON_HEIGHT) * ribbonProgress;

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="w-screen overflow-visible" style={{ height: `${ribbonHeight}px` }}>
          <FeatureRibbon progress={ribbonProgress} />
        </div>
      </div>

      <section ref={heroRef} className={HERO_SECTION_CLASS}>
        <div className={HERO_FRAME_CLASS}>
          <header className={HERO_HEADER_CLASS}>
            <Link href="/" className="block">
              <img
                src="/logos/logo_new_immobilei.svg?v=2"
                alt="ImmobiLei"
                className="h-auto w-[16.5rem] sm:w-[19.8rem]"
              />
            </Link>
            <div className="flex items-center gap-3">
              <PillButton tone="light">Prenota una consulenza</PillButton>
              <button
                type="button"
                className="btn-pill btn-pill-accent"
              >
                Menu
                <span className="flex flex-col gap-[3px]">
                  <span className="h-[1.5px] w-4 bg-current" />
                  <span className="h-[1.5px] w-4 bg-current" />
                </span>
              </button>
            </div>
          </header>

          <div className={`${HERO_CONTENT_CLASS} pt-10 lg:pt-14`}>
            <h1 ref={heroTitleRef} data-no-reveal className={`max-w-[10ch] ${HERO_H1_BASE_CLASS}`}>
              Ogni immobile e un percorso
            </h1>
            <p
              ref={heroSubtitleRef}
              data-no-reveal
              className="mt-8 max-w-[52rem] text-[16px] font-normal leading-[22px] tracking-[0em] text-[#191919]"
            >
              Ogni immobile porta con se scelte, dubbi e passaggi importanti.
              <br />
              In questa sezione raccontiamo alcuni dei percorsi che abbiamo seguito insieme ai nostri clienti.
            </p>
          </div>

          <div className="shrink-0" style={{ height: `${ribbonHeight}px` }} />
        </div>
      </section>

      <section ref={portfolioRef} className="px-[30px] pb-20 pt-8 lg:pb-28 lg:pt-10">
        <div className="space-y-24">
          <div className="grid gap-14 xl:grid-cols-[1.02fr_0.82fr] xl:items-start">
            <PropertyCard {...immobili[0]} align="start" />
            <PropertyCard {...immobili[1]} align="end" />
          </div>

          <div className="w-full">
            <PropertyCard {...immobili[2]} align="center" />
          </div>

          <div className="grid gap-14 xl:grid-cols-[0.82fr_1.02fr] xl:items-start">
            <PropertyCard {...immobili[3]} align="start" />
            <PropertyCard {...immobili[4]} align="end" />
          </div>

          <div className="w-full">
            <PropertyCard {...immobili[5]} align="center" />
          </div>

          <div className="grid gap-14 xl:grid-cols-[1.02fr_0.82fr] xl:items-start">
            <PropertyCard {...immobili[6]} align="start" />
            <PropertyCard {...immobili[7]} align="end" />
          </div>
        </div>
      </section>

      <footer className="overflow-hidden px-[30px] pb-0 pt-20 lg:pt-28">
        <div className="w-full">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.6fr_0.45fr]">
            <p
              className="max-w-[42rem] text-[16px] font-normal leading-[22px] tracking-[0em] text-[#161616]"
              style={{ textIndent: "6.2rem" }}
            >
              Che tu stia pensando di vendere, acquistare o semplicemente valutando le possibilita
              che hai davanti, affrontare il mondo immobiliare puo generare dubbi e incertezze.
              Immobilei nasce proprio per questo: aiutarti a fare chiarezza, analizzare la
              situazione e individuare il percorso piu adatto alle tue esigenze. Un confronto
              diretto puo essere il primo passo per trasformare una domanda in una decisione
              consapevole. Contattaci e raccontaci la tua situazione.
            </p>

            <div className="space-y-6 text-[16px] font-normal leading-[22px] tracking-[0em] text-[#161616]">
              <p>
                Piazza Carlo Felice 30,
                <br />
                Torino 10123
              </p>
              <p>+39 000 000 0000</p>
              <p>info@immobilei.com</p>
            </div>

            <div className="space-y-6 text-[16px] font-normal leading-[22px] tracking-[0em] text-[#161616]">
              <p>Instagram</p>
              <p>TikTok</p>
              <p>Youtube</p>
            </div>
          </div>

          <div className="mt-10 pt-6">
            <img
              src="/logos/logo_new_immobilei.svg?v=2"
              alt="ImmobiLei"
              className="h-auto w-full -translate-y-[15px]"
            />
          </div>
        </div>
      </footer>
    </main>
  );
}
