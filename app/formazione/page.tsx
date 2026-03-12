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

const sectionTitleClassName =
  "text-[50px] font-medium leading-[58px] tracking-[0em] text-[#111111]";

const featureLinks = [
  { label: "Immobili", bgClassName: "bg-[#e48fb0]", textClassName: "text-[#161616]" },
  { label: "Servizi", bgClassName: "bg-[#3c3fa4]", textClassName: "text-white", href: "/servizi" },
  {
    label: "Formazione",
    bgClassName: "bg-[#a8c3cf]",
    textClassName: "text-[#161616]",
    href: "/formazione",
  },
  { label: "Contatti", bgClassName: "bg-[#e8e3c7]", textClassName: "text-[#161616]" },
];

const HERO_RIBBON_HEIGHT = 188;
const STICKY_RIBBON_HEIGHT = 28;
const RIBBON_SCROLL_RANGE = 340;

const audienceCards = [
  {
    index: "01",
    title: "Agenti junior",
    description:
      "Per chi e all'inizio del percorso e vuole costruire basi piu solide, comprendere meglio dinamiche, processi e strumenti del lavoro immobiliare.",
  },
  {
    index: "01",
    title: "Professionisti che vogliono aggiornarsi",
    description:
      "Per chi lavora gia nel settore ma sente il bisogno di riorganizzare competenze, chiarire alcuni passaggi e affrontare il lavoro con maggiore struttura.",
  },
  {
    index: "01",
    title: "Agenti che cercano un approccio piu tecnico",
    description:
      "Per chi vuole approfondire aspetti operativi, consulenziali e strategici, superando una visione superficiale o standardizzata della professione.",
  },
];

const findings = [
  {
    title: "Videocorsi",
    body:
      "Contenuti video pratici e mirati, costruiti su situazioni reali del lavoro immobiliare. Ogni lezione aiuta a chiarire passaggi concreti e a consolidare un metodo operativo applicabile subito.",
  },
  {
    title: "Moduli tematici",
    body:
      "Percorsi organizzati per argomento, pensati per approfondire in modo ordinato i nodi piu importanti della professione: relazione con il cliente, analisi dell'immobile, gestione dei processi e passaggi strategici.",
  },
  {
    title: "Aggiornamenti operativi",
    body:
      "Approfondimenti periodici su criticita ricorrenti, dubbi pratici e dinamiche che cambiano nel lavoro quotidiano, per aiutare il professionista a rimanere allineato e lavorare con maggiore lucidita.",
  },
  {
    title: "Strumenti concreti",
    body:
      "Materiali di supporto, schemi e riferimenti utili per tradurre i contenuti in azione. L'obiettivo e rendere piu semplice passare dalla teoria alla pratica nel lavoro di ogni giorno.",
  },
];

const highlightedCourses = [
  {
    index: "01",
    title: "Leggere meglio un immobile",
    description:
      "Per sviluppare uno sguardo piu tecnico e consapevole durante l'analisi immobiliare.",
  },
  {
    index: "01",
    title: "Gestire il cliente con piu metodo",
    description:
      "Per affrontare dubbi, richieste e passaggi del rapporto professionale in modo piu strutturato.",
  },
  {
    index: "01",
    title: "Dalla trattativa all'atto",
    description:
      "Per avere una visione piu chiara delle dinamiche operative e decisionali del lavoro immobiliare.",
  },
  {
    index: "01",
    title: "Valutazione e posizionamento",
    description:
      "Per leggere il mercato con piu metodo e costruire valutazioni piu coerenti con obiettivi e contesto.",
  },
  {
    index: "01",
    title: "Comunicazione con il cliente",
    description:
      "Per gestire aspettative, obiezioni e passaggi delicati della relazione professionale con maggiore chiarezza.",
  },
  {
    index: "01",
    title: "Processi e organizzazione operativa",
    description:
      "Per impostare flussi di lavoro piu ordinati, ridurre errori e mantenere continuita nelle attivita quotidiane.",
  },
];

function PillButton({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light" | "tinted";
}) {
  const toneClassName =
    tone === "dark"
      ? "bg-[#19191d] text-white"
      : tone === "tinted"
        ? "bg-[#b7cfd9] text-[#161616] ring-1 ring-[#161616]"
        : "bg-transparent text-[#161616] ring-1 ring-[#161616]";

  return (
    <button
      type="button"
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-7 text-[1.1rem] font-medium tracking-[-0.03em] ${toneClassName}`}
    >
      {children}
    </button>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[16px] font-semibold leading-normal tracking-[0em] text-[#111111]">. {children}</p>;
}

function ArrowMark({ light = false, left = false }: { light?: boolean; left?: boolean }) {
  return (
    <img
      aria-hidden="true"
      src="/icons/freccia.svg"
      alt=""
      className={`block h-auto w-28 ${light ? "brightness-0 invert" : ""} ${left ? "rotate-180" : ""}`}
    />
  );
}

function PlaceholderVisual({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[14px] bg-[#d1d1d1] ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(140deg,transparent_49.7%,#4c4c4c_50%,transparent_50.3%)]" />
    </div>
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
                  <span className="pointer-events-none text-[30px] font-semibold leading-[28px] tracking-[0em] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100">
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
                className="text-[30px] font-semibold leading-[28px] tracking-[0em] transition-opacity duration-200 ease-out"
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

function AudienceCard({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) {
  return (
    <article className="flex min-h-[24rem] flex-col rounded-[16px] border border-[#676767] px-8 py-7">
      <div className="grid grid-cols-[4.5rem_1px_minmax(0,1fr)] items-center gap-x-6">
        <div className="text-[16px] font-bold leading-normal tracking-[0em] text-[#161616]">{index}</div>
        <div className="h-[64px] w-px bg-[#8a8a8a]" />
        <h3 className="text-[22px] font-normal leading-[1.05] tracking-[0em] text-[#151515]">{title}</h3>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <p className="max-w-[30rem] text-center text-[16px] font-normal leading-[22px] tracking-[0em] text-[#1c1c1c]">
          {description}
        </p>
      </div>
    </article>
  );
}

function CourseCard({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) {
  return (
    <article className="flex min-h-[22rem] flex-col rounded-[16px] border border-[#676767] px-8 py-7">
      <div className="grid grid-cols-[4.5rem_1px_minmax(0,1fr)] items-center gap-x-6">
        <div className="text-[16px] font-bold leading-normal tracking-[0em] text-[#161616]">{index}</div>
        <div className="h-[64px] w-px bg-[#8a8a8a]" />
        <h3 className="text-[22px] font-normal leading-[1.05] tracking-[0em] text-[#151515]">{title}</h3>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <p className="max-w-[30rem] text-center text-[16px] font-normal leading-[22px] tracking-[0em] text-[#1c1c1c]">
          {description}
        </p>
      </div>
    </article>
  );
}

export default function FormazionePage() {
  const [scrollY, setScrollY] = useState(0);
  const [openFindingIndex, setOpenFindingIndex] = useState(-1);
  const coursesCarouselRef = useRef<HTMLDivElement>(null);

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

  const ribbonProgress = Math.min(scrollY / RIBBON_SCROLL_RANGE, 1);
  const ribbonHeight =
    HERO_RIBBON_HEIGHT - (HERO_RIBBON_HEIGHT - STICKY_RIBBON_HEIGHT) * ribbonProgress;

  const scrollCourses = (direction: "left" | "right") => {
    const carousel = coursesCarouselRef.current;
    if (!carousel) return;

    const firstCard = carousel.querySelector<HTMLElement>("[data-course-card]");
    const cardWidth = firstCard?.offsetWidth ?? 0;
    const gap = 20;
    const delta = cardWidth + gap;

    carousel.scrollBy({
      left: direction === "right" ? delta : -delta,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-[#f2f2f0] text-[#161616]">
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="w-screen overflow-visible" style={{ height: `${ribbonHeight}px` }}>
          <FeatureRibbon progress={ribbonProgress} />
        </div>
      </div>

      <section className={HERO_SECTION_CLASS}>
        <div className={HERO_FRAME_CLASS}>
          <header className={HERO_HEADER_CLASS}>
            <Link href="/" className="block">
              <img
                src="/logos/logo%20%2B%20sub.svg"
                alt="ImmobiLei"
                className="h-auto w-[15rem] sm:w-[18rem]"
              />
            </Link>
            <div className="flex items-center gap-3">
              <PillButton tone="light">Prenota una consulenza</PillButton>
              <button
                type="button"
                className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#b7cfd9] px-7 text-[1.1rem] font-medium tracking-[-0.03em] text-[#161616] ring-1 ring-[#161616]"
              >
                Menu
                <span className="flex flex-col gap-[3px]">
                  <span className="h-[1.5px] w-4 bg-[#161616]" />
                  <span className="h-[1.5px] w-4 bg-[#161616]" />
                </span>
              </button>
            </div>
          </header>

          <div className={HERO_CONTENT_CLASS}>
            <h1 className={`${HERO_H1_BASE_CLASS}`}>
              <span className="block whitespace-nowrap">Formazione immobiliare</span>
              <span className="block whitespace-nowrap">che nasce dal lavoro reale</span>
            </h1>
            <p className="mt-8 max-w-[56rem] text-[16px] font-normal leading-[22px] tracking-[0em] text-[#191919]">
              Percorsi pensati per agenti immobiliari che vogliono rafforzare competenze, metodo e
              consapevolezza professionale attraverso contenuti pratici, aggiornati e direttamente
              legati all&apos;esperienza sul campo.
            </p>
            <div className="mt-10">
              <PillButton>richiedi informazioni</PillButton>
            </div>
          </div>

          <div className="shrink-0" style={{ height: `${ribbonHeight}px` }} />
        </div>
      </section>

      <section className="px-[30px] py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[11rem_minmax(34rem,1fr)_minmax(28rem,1fr)] xl:gap-16">
          <SectionEyebrow>introduzione</SectionEyebrow>
          <div className="space-y-10">
            <h2 className={`max-w-[12ch] ${sectionTitleClassName}`}>
              <span className="block whitespace-nowrap">Per chi vuole fare questo</span>
              <span className="block whitespace-nowrap">lavoro con piu metodo</span>
            </h2>
            <p
              className="max-w-[39rem] text-[16px] font-normal leading-[22px] tracking-[0em] text-[#1c1c1c]"
              style={{ textIndent: "6.2rem" }}
            >
              Nel settore immobiliare, esperienza e aggiornamento fanno la differenza. Ma non sempre
              la formazione disponibile riesce a rispondere ai dubbi reali che emergono nel lavoro
              quotidiano. Immobilei Academy nasce per offrire contenuti utili, concreti e
              applicabili, pensati per professionisti che vogliono rafforzare il proprio approccio
              operativo, affinare il metodo e affrontare il mercato con maggiore consapevolezza.
            </p>
          </div>
          <PlaceholderVisual className="aspect-[0.84/1] w-full max-w-[36rem] justify-self-end" />
        </div>
      </section>

      <section className="px-[30px] py-20 lg:py-28">
        <div className="space-y-14">
          <div className="grid gap-14 lg:grid-cols-[15rem_minmax(0,1fr)]">
            <SectionEyebrow>per chi</SectionEyebrow>
            <h2 className={`max-w-[15ch] ${sectionTitleClassName}`}>
              <span className="block whitespace-nowrap">Ogni percorso immobiliare</span>
              <span className="block whitespace-nowrap">parte da un bisogno diverso</span>
            </h2>
          </div>
          <div className="grid gap-5 xl:grid-cols-3">
            {audienceCards.map((card) => (
              <AudienceCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-[30px] py-20 lg:py-28">
        <div className="space-y-16">
          <div className="grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)]">
            <SectionEyebrow>cosa trovi</SectionEyebrow>
            <div className="space-y-10">
              <h2 className={`max-w-[12ch] ${sectionTitleClassName}`}>
                <span className="block whitespace-nowrap">Contenuti pensati per</span>
                <span className="block whitespace-nowrap">essere utili davvero</span>
              </h2>
              <p
                className="max-w-[44rem] text-[16px] font-normal leading-[22px] tracking-[0em] text-[#1c1c1c]"
                style={{ textIndent: "6.2rem" }}
              >
                La formazione proposta da Immobilei Academy e costruita per offrire strumenti
                applicabili, letture piu chiare del lavoro quotidiano e contenuti capaci di
                accompagnare il professionista nella pratica, non solo nella teoria.
              </p>
            </div>
          </div>

          <div className="border-t border-[#8b8b8b]">
            {findings.map((item, index) => {
              const open = openFindingIndex === index;

              return (
                <div key={item.title} className="border-b border-[#8b8b8b]">
                  <button
                    type="button"
                    onClick={() => setOpenFindingIndex(open ? -1 : index)}
                    className="flex w-full items-center justify-between gap-8 py-5 pr-10 text-left"
                  >
                    <span className="pl-3 text-[40px] font-light leading-[1.08] tracking-[0em] text-[#141414]">
                      {item.title}
                    </span>
                    <span className="shrink-0">
                      {open ? (
                        <span className="relative block h-8 w-8 before:absolute before:left-1/2 before:top-0 before:h-full before:w-[2px] before:-translate-x-1/2 before:rotate-45 before:bg-[#141414] after:absolute after:left-1/2 after:top-0 after:h-full after:w-[2px] after:-translate-x-1/2 after:-rotate-45 after:bg-[#141414]" />
                      ) : (
                        <ArrowMark />
                      )}
                    </span>
                  </button>

                  {open ? (
                    <div className="flex justify-end pb-8 pt-2 pr-24 lg:pr-28">
                      <div className="w-full max-w-[44rem]">
                        <p
                          className="text-left text-[16px] font-normal leading-[22px] tracking-[0em] text-[#1c1c1c]"
                          style={{ textIndent: "6.2rem" }}
                        >
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-[30px] py-16 lg:py-24">
        <PlaceholderVisual className="aspect-[1.8/1] w-full" />
      </section>

      <section className="px-[30px] py-20 lg:py-28">
        <div className="grid w-full gap-10 lg:grid-cols-[22rem_minmax(0,1fr)]">
          <SectionEyebrow>perche nasce Immobilei Academy</SectionEyebrow>
          <div className="w-full space-y-12">
            <p
              className="w-full max-w-none text-[42px] font-light leading-[50px] tracking-[0em] text-[#111111]"
              style={{ textIndent: "8.2rem" }}
            >
              Immobilei Academy nasce dall&apos;esperienza diretta nel settore immobiliare e dalla
              consapevolezza che molte delle difficolta del lavoro non emergono nei contenuti troppo
              teorici, ma nella pratica quotidiana.
              <br />
              Dubbi, passaggi complessi, relazioni con i clienti, lettura degli immobili, gestione
              dei processi: e li che si costruisce davvero la professionalita.
            </p>
            <p
              className="w-full max-w-none text-[42px] font-light leading-[50px] tracking-[0em] text-[#111111]"
              style={{ textIndent: "8.2rem" }}
            >
              Per questo abbiamo scelto di trasformare metodo, esperienza e osservazione in
              contenuti formativi utili, pensati per chi vuole lavorare in modo piu chiaro, piu
              consapevole e piu strutturato.
            </p>
          </div>
        </div>
      </section>

      <section className="px-[30px] py-20 lg:py-28">
        <div className="space-y-14">
          <div className="grid gap-14 lg:grid-cols-[15rem_minmax(0,1fr)]">
            <SectionEyebrow>corsi</SectionEyebrow>
            <h2 className={`max-w-[8ch] ${sectionTitleClassName}`}>
              <span className="block whitespace-nowrap">Percorsi</span>
              <span className="block whitespace-nowrap">in evidenza</span>
            </h2>
          </div>
          <div
            ref={coursesCarouselRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {highlightedCourses.map((course) => (
              <div key={course.title} data-course-card className="w-full min-w-[30rem] snap-start">
                <CourseCard {...course} />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 pr-10">
            <button
              type="button"
              onClick={() => scrollCourses("left")}
              aria-label="Scorri i corsi a sinistra"
            >
              <ArrowMark left />
            </button>
            <button
              type="button"
              onClick={() => scrollCourses("right")}
              aria-label="Scorri i corsi a destra"
            >
              <ArrowMark />
            </button>
          </div>
        </div>
      </section>

      <section className="px-[30px] py-24 lg:py-32">
        <div className="grid w-full gap-10 lg:grid-cols-[22rem_minmax(0,1fr)]">
          <SectionEyebrow>percorsi formativi</SectionEyebrow>
          <div className="w-full space-y-10">
            <p
              className="w-full max-w-none text-[42px] font-light leading-[50px] tracking-[0em] text-[#111111]"
              style={{ textIndent: "8.2rem" }}
            >
              Se vuoi capire meglio come funziona Immobilei Academy, ricevere aggiornamenti sui
              contenuti o scoprire i prossimi corsi disponibili, contattaci. Saremo felici di
              raccontarti il progetto e aiutarti a capire se e il percorso giusto per te.
            </p>
            <PillButton>richiedi un incontro</PillButton>
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
              src="/logos/Logo.svg"
              alt="ImmobiLei"
              className="h-auto w-full -translate-y-[15px]"
            />
          </div>
        </div>
      </footer>
    </main>
  );
}
