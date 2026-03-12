"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

const serviceEntryCards = [
  {
    index: "01",
    title: "Sto cercando casa",
    description:
      "Devo capire se l'immobile e giusto, come muovermi con documenti, verifiche e trattative.",
    cta: "Scopri come possiamo aiutarti",
  },
  {
    index: "02",
    title: "Voglio vendere casa",
    description:
      "Devo capire il valore reale dell'immobile e impostare una vendita efficace.",
    cta: "Scopri il percorso di vendita",
  },
  {
    index: "03",
    title: "Ho bisogno di una consulenza",
    description:
      "Ho dubbi o situazioni da chiarire prima di prendere una decisione.",
    cta: "Prenota una consulenza",
  },
];

const accordionSections = [
  {
    eyebrow: "acquirente",
    titleLines: ["Acquistare casa", "con piu consapevolezza"],
    intro:
      "Comprare un immobile e una delle decisioni piu importanti nella vita di una persona. Per questo Immobilei affianca l'acquirente fin dalle prime fasi, aiutandolo a leggere correttamente l'immobile, verificare gli aspetti tecnici e affrontare il percorso con maggiore sicurezza.",
    items: [
      {
        title: "Analisi delle esigenze",
        body:
          "Un primo confronto per capire obiettivi, tempi, budget e criteri di scelta. Mettiamo ordine tra priorita, dubbi e vincoli reali prima di iniziare la ricerca.",
      },
      {
        title: "Consulenza pre-acquisto",
        body:
          "Ti aiutiamo a leggere il contesto, valutare i pro e i contro delle opzioni disponibili e costruire un processo di acquisto piu lucido e sostenibile.",
      },
      {
        title: "Lettura tecnica dell'immobile",
        body:
          "Una verifica orientativa dei punti tecnici e documentali piu delicati, per individuare criticita e capire quali approfondimenti servono prima di procedere.",
      },
      {
        title: "Affiancamento con professionisti",
        body:
          "Quando serve, coordiniamo i professionisti piu adatti al caso per supportarti nella verifica di pratiche, conformita e passaggi operativi.",
      },
      {
        title: "Supporto documentale",
        body:
          "Ti aiutiamo a comprendere documenti, passaggi e aspetti burocratici legati all'acquisto.",
      },
    ],
  },
  {
    eyebrow: "venditore",
    titleLines: ["Vendere casa con una", "strategia chiara"],
    intro:
      "Vendere un immobile non significa semplicemente pubblicare un annuncio. Serve una valutazione corretta, una strategia di presentazione e una gestione attenta delle fasi di vendita.",
    items: [
      {
        title: "Analisi del potenziale dell'immobile",
        body:
          "Valutiamo il posizionamento dell'immobile, i suoi punti di forza e gli aspetti da migliorare per renderlo piu chiaro e competitivo sul mercato.",
      },
      {
        title: "Valutazione immobiliare",
        body:
          "Costruiamo una valutazione piu consapevole tenendo insieme dati, contesto e obiettivi, evitando aspettative fuori scala o strategie inefficaci.",
      },
      {
        title: "Strategia di vendita",
        body:
          "Definiamo il percorso piu adatto per presentare l'immobile, impostare il prezzo, comunicare il valore e gestire i tempi della vendita.",
      },
      {
        title: "Supporto documentale",
        body:
          "Ti affianchiamo nella raccolta e nella lettura dei materiali necessari per affrontare la vendita con maggiore ordine e meno attriti operativi.",
      },
      {
        title: "Valorizzazione dell'immobile",
        body:
          "Individuiamo i punti di forza della proprieta e li comunichiamo nel modo piu efficace.",
      },
    ],
  },
  {
    eyebrow: "consulenza immobiliare",
    titleLines: ["Quando serve fare", "chiarezza"],
    intro:
      "Non sempre si e pronti a comprare o vendere. Spesso il primo passo e capire meglio la propria situazione, valutare le possibilita e orientarsi tra aspetti tecnici, documentali e strategici. La consulenza immobiliare Immobilei nasce proprio per questo: offrire un confronto professionale che aiuti a leggere il contesto e prendere decisioni piu consapevoli.",
    items: [
      {
        title: "Analisi della situazione",
        body:
          "Partiamo da cio che sta succedendo: obiettivi, problemi, tempistiche e vincoli. Una lettura chiara della situazione aiuta a capire quali passi hanno davvero senso.",
      },
      {
        title: "Verifica criticita",
        body:
          "Mettiamo a fuoco gli elementi che rischiano di rallentare o complicare il percorso, cosi da affrontarli con il giusto ordine e senza improvvisazioni.",
      },
      {
        title: "Orientamento tecnico",
        body:
          "Ti aiutiamo a comprendere gli aspetti tecnici emersi e a capire quando e come coinvolgere altri professionisti in modo utile.",
      },
      {
        title: "Orientamento documentale",
        body:
          "Facciamo chiarezza su documenti, conformita e materiali necessari per leggere meglio il quadro prima di una scelta importante.",
      },
      {
        title: "Supporto decisionale",
        body:
          "Ti aiutiamo a scegliere la direzione piu adatta.",
      },
    ],
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

function ServiceIntentCard({
  index,
  title,
  description,
  cta,
}: {
  index: string;
  title: string;
  description: string;
  cta: string;
}) {
  return (
    <article className="flex min-h-[32rem] flex-col rounded-[16px] border border-[#676767] px-8 py-7">
      <div className="grid grid-cols-[4.5rem_1px_minmax(0,1fr)] items-center gap-x-6">
        <div className="text-[16px] font-bold leading-normal tracking-[0em] text-[#161616]">{index}</div>
        <div className="h-[64px] w-px bg-[#8a8a8a]" />
        <h3 className="text-[24px] font-normal leading-normal tracking-[0em] text-[#151515]">{title}</h3>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <p
          className="max-w-[18rem] text-center text-[16px] font-normal leading-[22px] tracking-[0em] text-[#1c1c1c]"
          style={{ textIndent: "6.2rem" }}
        >
          {description}
        </p>
      </div>
      <div className="flex items-center gap-8 pt-6">
        <ArrowMark />
        <p className="text-[16px] font-normal leading-[22px] tracking-[0em] text-[#161616]">{cta}</p>
      </div>
    </article>
  );
}

function ServiceAccordionSection({
  eyebrow,
  titleLines,
  intro,
  items,
}: {
  eyebrow: string;
  titleLines: string[];
  intro: string;
  items: { title: string; body: string }[];
}) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="px-[30px] py-20 lg:py-28">
      <div className="space-y-16">
        <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <div className="space-y-10">
            <h2 className={`max-w-[15ch] ${sectionTitleClassName}`}>
              <span className="block whitespace-nowrap">{titleLines[0]}</span>
              <span className="block whitespace-nowrap">{titleLines[1]}</span>
            </h2>
            <p
              className="max-w-[44rem] text-[16px] font-normal leading-[22px] tracking-[0em] text-[#1c1c1c]"
              style={{ textIndent: "6.2rem" }}
            >
              {intro}
            </p>
          </div>
        </div>

        <div className="border-t border-[#8b8b8b]">
          {items.map((item, index) => {
            const open = openIndex === index;

            return (
              <div key={item.title} className="border-b border-[#8b8b8b]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full items-center justify-between gap-8 py-5 text-left"
                >
                  <span className="text-[32px] font-light leading-[1.08] tracking-[0em] text-[#141414] lg:text-[40px]">
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
                    <div className="w-full max-w-[38rem]">
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
  );
}

export default function ServiziPage() {
  const [scrollY, setScrollY] = useState(0);

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
              <span className="block whitespace-nowrap">Non ci occupiamo solo di</span>
              <span className="block whitespace-nowrap">trovare o vendere casa</span>
            </h1>
            <p className="mt-8 max-w-[54rem] text-[16px] font-normal leading-[22px] tracking-[0em] text-[#191919]">
              Immobilei affianca chi compra, chi vende e chi ha bisogno di orientarsi nel mondo
              immobiliare. Oltre alla compravendita, offriamo consulenza, analisi e supporto
              operativo per affrontare ogni passaggio con maggiore chiarezza.
            </p>
            <div className="mt-10">
              <PillButton>prenota una consulenza</PillButton>
            </div>
          </div>

          <div className="shrink-0" style={{ height: `${ribbonHeight}px` }} />
        </div>
      </section>

      <section className="px-[30px] py-20 lg:py-28">
        <div className="space-y-14">
          <div className="grid gap-14 lg:grid-cols-[15rem_minmax(0,1fr)]">
            <SectionEyebrow>cosa facciamo</SectionEyebrow>
            <h2 className={`max-w-[15ch] ${sectionTitleClassName}`}>
              <span className="block whitespace-nowrap">Ogni percorso immobiliare</span>
              <span className="block whitespace-nowrap">parte da un bisogno diverso</span>
            </h2>
          </div>
          <div className="grid gap-5 xl:grid-cols-3">
            {serviceEntryCards.map((card) => (
              <ServiceIntentCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      {accordionSections.map((section) => (
        <ServiceAccordionSection key={section.eyebrow} {...section} />
      ))}

      <section className="px-[30px] py-24 lg:py-32">
        <div className="space-y-10 lg:pl-[28rem]">
          <p
            className="w-full max-w-none text-[42px] font-light leading-[50px] tracking-[0em] text-[#111111]"
            style={{ textIndent: "6.2rem" }}
          >
            Ogni situazione immobiliare e diversa. Un confronto puo aiutarti a capire quali sono i
            passi piu giusti da compiere.
          </p>
          <PillButton>contattaci</PillButton>
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
