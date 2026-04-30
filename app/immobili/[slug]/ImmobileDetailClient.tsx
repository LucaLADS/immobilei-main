"use client";

import Link from "next/link";
import { HERO_HEADER_CLASS } from "@/lib/hero-layout";
import type { Immobile } from "@/lib/immobili";
import { useUltraPremiumTextReveal } from "@/lib/text-reveal";

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

function PlaceholderVisual({
  className = "",
  reveal = false,
}: {
  className?: string;
  reveal?: boolean;
}) {
  return (
    <div
      className={`img-zoom relative overflow-hidden rounded-[12px] bg-[#d1d1d3] ${className}`}
      data-fade-media={reveal ? "true" : undefined}
    >
      <div className="img-zoom-inner absolute inset-0 bg-[linear-gradient(150deg,transparent_49.7%,#707070_50%,transparent_50.3%)]" />
    </div>
  );
}

export default function ImmobileDetailClient({ immobile }: { immobile: Immobile }) {
  useUltraPremiumTextReveal();

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="px-[30px] pb-0 pt-4 lg:pt-6">
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

        <h1 className="pt-84 text-[86px] font-medium leading-[0.92] tracking-[0em] text-[#17171a] lg:pt-[25.5rem]">
          {immobile.title}
        </h1>
      </section>

      <section className="mt-20 border-t border-[#7c7c7c] px-[30px] pt-4 lg:mt-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-[#7c7c7c] pb-4">
              <p className="text-[16px] font-semibold leading-normal tracking-[0em] text-[#151515]">Tipo di progetto</p>
              <p className="text-[16px] font-normal leading-normal tracking-[0em] text-[#151515]">{immobile.projectType}</p>
            </div>
            <div className="flex items-center justify-between border-b border-[#7c7c7c] pb-4">
              <p className="text-[16px] font-semibold leading-normal tracking-[0em] text-[#151515]">Anno</p>
              <p className="text-[16px] font-normal leading-normal tracking-[0em] text-[#151515]">{immobile.year}</p>
            </div>
            <div className="flex items-center justify-between border-b border-[#7c7c7c] pb-4">
              <p className="text-[16px] font-semibold leading-normal tracking-[0em] text-[#151515]">Posizione</p>
              <p className="text-[16px] font-normal leading-normal tracking-[0em] text-[#151515]">{immobile.position}</p>
            </div>
          </div>

          <div className="border-[#7c7c7c] lg:border-l lg:pl-8">
            <div className="flex items-center justify-between">
              <p className="text-[16px] font-semibold leading-normal tracking-[0em] text-[#151515]">Tipologia di immobile</p>
              <p className="text-[16px] font-normal leading-normal tracking-[0em] text-[#151515]">{immobile.propertyType}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 px-[30px] lg:mt-8">
        <PlaceholderVisual reveal className="aspect-[2.15/1] w-full" />
      </section>

      <section className="mt-20 px-[30px] lg:mt-24">
        <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14">
          <p className="text-[16px] font-semibold leading-normal tracking-[0em] text-[#111111]">. descrizione</p>
          <p
            className="w-full max-w-none text-[42px] font-light leading-[50px] tracking-[0em] text-[#111111]"
            style={{ textIndent: "8.2rem" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </section>

      <section className="mt-16 grid gap-12 px-[30px] lg:mt-20 lg:grid-cols-[1.15fr_0.95fr] lg:items-start">
        <div className="space-y-8">
          <PlaceholderVisual reveal className="aspect-[1.67/1] w-full" />
          <div className="grid gap-8 text-[16px] font-normal leading-[22px] tracking-[0em] text-[#1a1a1a] lg:grid-cols-2">
            <p style={{ textIndent: "6.2rem" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p style={{ textIndent: "6.2rem" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>

        <PlaceholderVisual reveal className="aspect-[0.9/1] w-full" />
      </section>

      <section className="mt-16 px-[30px] lg:mt-20">
        <PlaceholderVisual reveal className="aspect-[1.95/1] w-full" />
      </section>

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
