"use client";

import { useEffect } from "react";

const TEXT_REVEAL_SELECTOR =
  "main h1:not([data-no-reveal]), main h2:not([data-no-reveal]), main h3:not([data-no-reveal]), main h4:not([data-no-reveal]), main h5:not([data-no-reveal]), main h6:not([data-no-reveal]), main p:not([data-no-reveal])";
const MEDIA_REVEAL_SELECTOR = "main [data-fade-media]:not([data-no-reveal])";

export function clearUltraPremiumTextReveal(root: ParentNode = document) {
  const nodes = Array.from(
    root.querySelectorAll(".fade-in, .fade-in-media, .in-page, [data-fade-ready]"),
  ) as HTMLElement[];

  nodes.forEach((node) => {
    node.classList.remove("fade-in", "fade-in-media", "in-page");
    delete node.dataset.fadeReady;
    node.style.transitionDelay = "";
  });
}

export function useUltraPremiumTextReveal(rootSelector = "main") {
  useEffect(() => {
    const root = document.querySelector(rootSelector);
    if (!root) return;
    clearUltraPremiumTextReveal(root);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-page");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -4% 0px" },
    );

    const collectTargets = () => {
      const textTargets = Array.from(
        document.querySelectorAll(TEXT_REVEAL_SELECTOR),
      ).filter((node) => ((node.textContent ?? "").trim().length > 0)) as HTMLElement[];

      const mediaTargets = Array.from(
        document.querySelectorAll(MEDIA_REVEAL_SELECTOR),
      ) as HTMLElement[];

      return [...textTargets, ...mediaTargets];
    };

    const revealVisibleTargets = () => {
      const pending = Array.from(
        document.querySelectorAll("main .fade-in:not(.in-page)"),
      ) as HTMLElement[];

      pending.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.98 && rect.bottom > 0;
        if (isVisible) {
          node.classList.add("in-page");
          observer.unobserve(node);
        }
      });
    };

    const applyFadeTargets = () => {
      const targets = collectTargets();

      targets.forEach((node, index) => {
        if (node.dataset.fadeReady === "1") return;
        node.dataset.fadeReady = "1";
        node.style.transitionDelay = `${Math.min(index % 6, 5) * 28}ms`;
        node.classList.add(node.matches("[data-fade-media]") ? "fade-in-media" : "fade-in");
        observer.observe(node);
      });
    };

    applyFadeTargets();
    requestAnimationFrame(() => revealVisibleTargets());
    const fallbackTimeout = window.setTimeout(revealVisibleTargets, 220);

    const mutationObserver = new MutationObserver(() => {
      applyFadeTargets();
      revealVisibleTargets();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("scroll", revealVisibleTargets, { passive: true });
    window.addEventListener("resize", revealVisibleTargets);

    return () => {
      window.clearTimeout(fallbackTimeout);
      window.removeEventListener("scroll", revealVisibleTargets);
      window.removeEventListener("resize", revealVisibleTargets);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [rootSelector]);
}
