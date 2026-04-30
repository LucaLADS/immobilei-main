"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  HERO_CONTENT_CLASS,
  HERO_FRAME_CLASS,
  HERO_H1_BASE_CLASS,
  HERO_HEADER_CLASS,
  HERO_SECTION_CLASS,
} from "@/lib/hero-layout";
import { AnnotatedWord } from "@/components/AnnotatedWord";
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

const serviceCards = [
  {
    index: "01",
    title: "Compravendita immobiliare",
    description:
      "Seguiamo la vendita e l'acquisto di immobili con un approccio chiaro e strutturato. Non ci limitiamo a pubblicare annunci: analizziamo il mercato, valorizziamo l'immobile e accompagniamo ogni fase della trattativa. Dalla prima valutazione fino al rogito, lavoriamo per rendere il processo piu semplice, sicuro e consapevole.",
  },
  {
    index: "02",
    title: "Consulenza e gestione",
    description:
      "L'immobiliare e fatto di decisioni importanti e spesso complesse. ImmobiLei affianca chi compra o vende con consulenze mirate, analisi dell'immobile e supporto tecnico. Coordiniamo professionisti e passaggi operativi per aiutarti a capire cosa fare, quando farlo e come farlo nel modo giusto.",
  },
  {
    index: "03",
    title: "Aggiornamento per professionisti",
    description:
      "Mettiamo a disposizione percorsi di aggiornamento pensati per agenti immobiliari che vogliono rafforzare competenze e metodo. Contenuti concreti, basati sull'esperienza sul campo, per affrontare con piu consapevolezza trattative, processi e dinamiche del mercato immobiliare.",
  },
];

const properties = [
  { title: "Villa in campagna", year: "2025", status: "In vendita", large: true },
  { title: "Bilocale a Torino", year: "2025", status: "In vendita", large: false },
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

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[16px] font-semibold leading-normal tracking-[0em] text-[#111111]">. {children}</p>;
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

function ServiceCard({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) {
  return (
    <article
      className="home-service-card flex min-h-[24rem] w-full max-w-[33.5rem] flex-col rounded-[16px] border border-[#676767] bg-transparent px-7 py-6"
      style={{ willChange: "transform, opacity" }}
    >
      <div className="flex min-h-[5.5rem] items-center justify-center">
        <div className="grid w-full grid-cols-[4.5rem_1px_minmax(0,1fr)] items-center gap-x-6 border-b border-[#b6b6b6] pb-5">
          <div className="text-[16px] font-bold leading-normal tracking-[0em] text-[#161616]">{index}</div>
          <div className="h-[64px] w-px justify-self-center bg-[#8a8a8a]" />
          <h3 data-no-reveal className="max-w-none text-[22px] font-normal leading-normal tracking-[0em] text-[#151515]">
            {title}
          </h3>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center pt-6">
        <p
          data-no-reveal
          className="max-w-[26rem] text-left text-[16px] font-normal leading-[22px] tracking-[0em] text-[#1c1c1c]"
          style={{ textIndent: "6.2rem" }}
        >
          {description}
        </p>
      </div>
    </article>
  );
}

function PropertyCard({
  title,
  year,
  status,
  large,
}: {
  title: string;
  year: string;
  status: string;
  large: boolean;
}) {
  if (large) {
    return (
      <article
        className="home-property-card space-y-5"
        style={{ willChange: "transform, opacity" }}
      >
        <PlaceholderVisual reveal className="aspect-[1.56/1] w-full max-w-[80%] self-start" />
        <div className="grid w-full max-w-[80%] gap-4 lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start">
          <div className="pt-2">
            <ArrowMark />
          </div>
          <div className="grid w-full gap-3">
            <div className="flex items-end justify-between gap-4 border-b border-[#646464] pb-3">
              <h3 data-no-reveal className="text-[16px] font-semibold leading-normal tracking-[0em] text-[#151515]">{title}</h3>
              <span data-no-reveal className="text-[16px] font-semibold leading-normal tracking-[0em] text-[#151515]">{year}</span>
            </div>
            <p data-no-reveal className="text-[16px] font-normal leading-[22px] tracking-[0em] text-[#161616]">{status}</p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="home-property-card w-[92%] max-w-none justify-self-end space-y-5"
      style={{ willChange: "transform, opacity" }}
    >
      <PlaceholderVisual reveal className="aspect-[1.67/1] w-full" />
      <div className="grid w-full gap-4 lg:grid-cols-[9.5rem_minmax(0,1fr)] lg:items-start">
        <div className="pt-2">
          <ArrowMark />
        </div>
        <div className="grid w-full pl-3 gap-3">
          <div className="flex items-end justify-between gap-4 border-b border-[#646464] pb-3">
            <h3 data-no-reveal className="text-[16px] font-semibold leading-normal tracking-[0em] text-[#151515]">{title}</h3>
            <span data-no-reveal className="text-[16px] font-semibold leading-normal tracking-[0em] text-[#151515]">{year}</span>
          </div>
          <p data-no-reveal className="text-[16px] font-normal leading-[22px] tracking-[0em] text-[#161616]">{status}</p>
        </div>
      </div>
    </article>
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
                className={`text-[30px] leading-[28px] ${item.labelWeightClassName ?? "font-medium"} tracking-[0em] transition-opacity duration-200 ease-out`}
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

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement | null>(null);
  const heroCtaRef = useRef<HTMLDivElement | null>(null);
  const homeServicesCardsSectionRef = useRef<HTMLElement | null>(null);
  const homePropertiesSectionRef = useRef<HTMLElement | null>(null);

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
      })
        .from(
          heroSubtitleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.82,
            ease: "power2.out",
          },
          "-=0.55",
        )
        .from(
          heroCtaRef.current,
          {
            opacity: 0,
            scale: 0.97,
            duration: 0.72,
            ease: "power2.out",
          },
          "-=0.42",
        );
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let mm: ReturnType<typeof gsap.matchMedia> | null = null;

    const ctx = gsap.context(() => {
      mm = gsap.matchMedia();

      const serviceCards = gsap.utils.toArray<HTMLElement>(".home-service-card");
      if (serviceCards.length) {
        mm?.add("(min-width: 1280px)", () => {
          serviceCards.forEach((card, index) => {
            const sideOffset = index === 1 ? 0 : index < 1 ? -48 : 48;

            gsap.fromTo(
              card,
              {
                x: sideOffset,
                y: 26,
                scale: 0.992,
                autoAlpha: 0,
                willChange: "transform, opacity",
                force3D: true,
              },
              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 92%",
                  end: "top 64%",
                  scrub: 0.85,
                  invalidateOnRefresh: true,
                },
              },
            );
          });
        });

        mm?.add("(max-width: 1279px)", () => {
          serviceCards.forEach((card) => {
            gsap.fromTo(
              card,
              {
                y: 22,
                autoAlpha: 0,
                willChange: "transform, opacity",
                force3D: true,
              },
              {
                y: 0,
                autoAlpha: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 94%",
                  end: "top 70%",
                  scrub: 0.8,
                  invalidateOnRefresh: true,
                },
              },
            );
          });
        });
      }

      const applySectionStackToGrid = (selector: string, trigger: HTMLElement | null) => {
        if (!trigger) return;

        const cards = gsap.utils.toArray<HTMLElement>(selector);
        if (!cards.length) return;

        mm?.add("(min-width: 1280px)", () => {
          const centerIndex = (cards.length - 1) / 2;
          const spread = cards.length <= 2 ? 84 : 112;

          gsap.fromTo(
            cards,
            {
              x: (index) => (centerIndex - index) * spread,
              y: (index) => (index === centerIndex ? 8 : 18),
              scale: (index) => (index === centerIndex ? 1 : 0.992),
              autoAlpha: 0,
              zIndex: (index) => (index === centerIndex ? 3 : 2),
              willChange: "transform, opacity",
              force3D: true,
            },
            {
              x: 0,
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 1.08,
              ease: "power3.out",
              stagger: {
                each: 0.145,
                from: "center",
              },
              clearProps: "transform,opacity,willChange,zIndex",
              overwrite: "auto",
              scrollTrigger: {
                trigger,
                start: "top 90%",
                toggleActions: "play none none none",
                once: true,
              },
            },
          );
        });

        mm?.add("(max-width: 1279px)", () => {
          gsap.fromTo(
            cards,
            {
              y: 24,
              autoAlpha: 0,
              willChange: "transform, opacity",
              force3D: true,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.96,
              ease: "power2.out",
              stagger: 0.12,
              clearProps: "transform,opacity,willChange",
              overwrite: "auto",
              scrollTrigger: {
                trigger,
                start: "top 90%",
                toggleActions: "play none none none",
                once: true,
              },
            },
          );
        });
      };

      applySectionStackToGrid(".home-property-card", homePropertiesSectionRef.current);
    });

    return () => {
      mm?.revert();
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
            <img
                src="/logos/logo_new_immobilei.svg?v=2"
              alt="ImmobiLei"
              className="h-auto w-[16.5rem] sm:w-[19.8rem]"
            />
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

          <div className={HERO_CONTENT_CLASS}>
            <h1 ref={heroTitleRef} data-no-reveal className={`max-w-[16ch] ${HERO_H1_BASE_CLASS}`}>
              <span className="block whitespace-nowrap">Il mondo immobiliare,</span>
              <span className="block whitespace-nowrap">
                <AnnotatedWord
                  variant="wave"
                  color="#8e69ff"
                  delay={0.78}
                  duration={0.54}
                >
                  spiegato semplice
                </AnnotatedWord>
              </span>
            </h1>
            <p
              ref={heroSubtitleRef}
              data-no-reveal
              className="mt-7 max-w-[46rem] text-[16px] leading-[22px] font-normal tracking-[0em] text-[#191919]"
            >
              Immobilei accompagna chi compra, vende o vuole valorizzare il proprio immobile con
              consulenza, supporto operativo e professionisti specializzati.
            </p>
            <div ref={heroCtaRef} className="mt-10">
              <PillButton>scopri di piu</PillButton>
            </div>
          </div>

          <div className="shrink-0" style={{ height: `${ribbonHeight}px` }} />
        </div>
      </section>

      <section className="px-[30px] py-20 lg:py-28">
        <div className="grid w-full gap-10 lg:grid-cols-[22rem_minmax(0,1fr)]">
          <SectionEyebrow>chi siamo</SectionEyebrow>
          <div className="space-y-12">
            <p
              className="w-full max-w-none text-[42px] leading-[50px] font-light tracking-[0em] text-[#111111]"
              style={{ textIndent: "8.2rem" }}
            >
              Eliminiamo gli ostacoli tra te e la tua casa dei sogni, ImmobiLei non e soltanto uno
              studio di consulenza immobiliare, ma il punto di partenza per trovare la tua casa
              ideale. Dall&apos;acquisto della tua prima proprieta, alla strategia per la vendita del
              tuo vecchio immobile, passando per la valutazione del tuo investimento: tutto questo e
              ImmobiLei.
            </p>
            <PillButton>scopri chi siamo</PillButton>
          </div>
        </div>
      </section>

      <section ref={homeServicesCardsSectionRef} className="px-[30px] py-20 lg:py-28">
        <div className="grid w-full gap-12 lg:grid-cols-[11rem_minmax(34rem,1fr)_minmax(28rem,31.5rem)] xl:gap-16">
          <SectionEyebrow>cosa facciamo</SectionEyebrow>
          <div className="flex h-full flex-col">
            <div className="grid content-start gap-10">
              <h2 className="max-w-none text-[50px] font-medium leading-[58px] tracking-[0em]">
                <span className="block whitespace-nowrap">Un supporto immobiliare</span>
                <span className="block whitespace-nowrap">piu completo</span>
              </h2>
              <p
                className="max-w-[39rem] text-[16px] font-normal leading-[22px] tracking-[0em] text-[#1c1c1c]"
                style={{ textIndent: "6.2rem" }}
              >
                Immobilei nasce per rendere il percorso immobiliare piu chiaro e gestibile. Che si
                tratti di comprare, vendere o orientarsi tra dubbi e decisioni importanti, offriamo
                un supporto concreto fatto di esperienza, metodo e professionisti qualificati. Il
                nostro lavoro si sviluppa su tre aree principali: intermediazione immobiliare,
                consulenza dedicata e aggiornamento professionale. Tre pilastri diversi, ma uniti
                dallo stesso obiettivo: aiutare le persone e i professionisti a muoversi nel mercato
                immobiliare con piu consapevolezza.
              </p>
              <div className="pt-3">
                <PillButton>scopri chi siamo</PillButton>
              </div>
            </div>
            <PlaceholderVisual className="mt-10 aspect-[1/1.28] w-full max-w-[30rem] self-start lg:mt-auto lg:ml-[-14rem]" />
          </div>
          <div className="justify-self-end space-y-8">
            {serviceCards.map((card) => (
              <div key={card.index}>
                <ServiceCard {...card} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={homePropertiesSectionRef} className="px-[30px] py-20 lg:py-28">
        <div className="grid w-full gap-14 lg:grid-cols-[14rem_minmax(32rem,1fr)_minmax(24rem,1fr)]">
          <SectionEyebrow>come lavoriamo</SectionEyebrow>
          <div className="space-y-10">
            <h2 className="max-w-none text-[50px] font-medium leading-[58px] tracking-[0em]">
              <span className="block whitespace-nowrap">Una storia di fiducia</span>
              <span className="block whitespace-nowrap">e competenza</span>
            </h2>
            <p
              className="max-w-[42rem] text-[16px] font-normal leading-[22px] tracking-[0em] text-[#1c1c1c]"
              style={{ textIndent: "6.2rem" }}
            >
              Ogni percorso immobiliare e diverso, ma una cosa non cambia mai: per prendere
              decisioni giuste servono chiarezza, metodo e il supporto delle persone giuste. Per
              questo ImmobiLei non si limita a intervenire in un singolo momento, ma accompagna il
              cliente lungo tutto il processo, aiutandolo a capire, valutare e agire con maggiore
              consapevolezza. Il nostro lavoro parte dall&apos;ascolto e si costruisce passo dopo passo,
              con un approccio concreto, diretto e sempre orientato alla soluzione.
            </p>
            <PillButton>scopri di piu</PillButton>
          </div>
          <PlaceholderVisual className="aspect-[1/1.28] w-full max-w-[30rem] justify-self-end" />
        </div>
      </section>

      <section className="px-[30px] py-20 lg:py-28">
        <div className="grid w-full gap-10 lg:grid-cols-[22rem_minmax(0,1fr)]">
          <SectionEyebrow>i servizi</SectionEyebrow>
          <div className="w-full space-y-12">
            <p
              className="w-full max-w-none text-[42px] font-light leading-[50px] tracking-[0em] text-[#111111]"
              style={{ textIndent: "8.2rem" }}
            >
              Ogni immobile ha una storia diversa e ogni persona affronta il mercato immobiliare con
              esigenze specifiche. C&apos;e chi deve vendere, chi sta cercando casa, chi ha dubbi su
              come gestire un immobile o su quali decisioni prendere. In queste situazioni avere un
              riferimento chiaro puo fare davvero la differenza.
            </p>
            <p
              className="w-full max-w-none text-[42px] font-light leading-[50px] tracking-[0em] text-[#111111]"
              style={{ textIndent: "8.2rem" }}
            >
              I servizi di Immobilei nascono proprio per accompagnare le persone in questi
              passaggi. Non si tratta solo di intermediazione, ma di un supporto piu ampio che
              aiuta a leggere meglio il mercato, comprendere il valore dell&apos;immobile e affrontare
              ogni fase del percorso con maggiore consapevolezza.
            </p>
            <p
              className="w-full max-w-none text-[42px] font-light leading-[50px] tracking-[0em] text-[#111111]"
              style={{ textIndent: "8.2rem" }}
            >
              Attraverso consulenze dedicate, analisi e affiancamento operativo, aiutiamo chi si
              trova davanti a una scelta immobiliare a orientarsi con piu sicurezza, evitando errori
              e perdite di tempo. Perche spesso la differenza non sta solo nel risultato finale, ma
              nel modo in cui si arriva a raggiungerlo.
            </p>
            <PillButton>scopri i servizi</PillButton>
          </div>
        </div>
      </section>

      <section className="px-[30px] py-20 lg:py-28">
        <div className="w-full">
          <div className="mb-10">
            <SectionEyebrow>immobili</SectionEyebrow>
          </div>
          <div className="grid gap-14 xl:grid-cols-[1.02fr_0.82fr] xl:items-start">
            {properties.map((property) => (
              <div key={property.title}>
                <PropertyCard {...property} />
              </div>
            ))}
          </div>
          <div className="mt-20 flex flex-col items-center gap-10 text-center">
            <h2 className="max-w-[12ch] text-[50px] font-medium leading-[58px] tracking-[0em]">
              Scopri gli immobili in vendita
            </h2>
            <PillButton>tutti gli immobili</PillButton>
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
