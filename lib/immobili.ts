export type Immobile = {
  slug: string;
  title: string;
  year: string;
  status: string;
  large: boolean;
  projectType: string;
  propertyType: string;
  position: string;
  details: string;
  description: string;
};

export const immobili: Immobile[] = [
  {
    slug: "immobile-1",
    title: "Immobile 1",
    year: "2025",
    status: "2020",
    large: true,
    projectType: "Mediazione immobiliare",
    propertyType: "Metratura e servizi",
    position: "Torino, (TO)",
    details: "Residenziale",
    description:
      "Eliminiamo gli ostacoli tra te e la tua casa dei sogni. ImmobiLei accompagna ogni fase con metodo, strategia e attenzione operativa.",
  },
  {
    slug: "immobile-2",
    title: "Immobile 2",
    year: "2025",
    status: "2021",
    large: false,
    projectType: "Compravendita",
    propertyType: "Metratura e servizi",
    position: "Torino, (TO)",
    details: "Residenziale",
    description:
      "Seguiamo la vendita e l'acquisto con un approccio chiaro e strutturato, dalla valutazione iniziale fino alla chiusura dell'operazione.",
  },
  {
    slug: "immobile-3",
    title: "Immobile 3",
    year: "2025",
    status: "2022",
    large: false,
    projectType: "Consulenza immobiliare",
    propertyType: "Metratura e servizi",
    position: "Torino, (TO)",
    details: "Residenziale",
    description:
      "Analisi, strategia e supporto tecnico-documentale per affrontare il percorso immobiliare con maggiore consapevolezza.",
  },
  {
    slug: "immobile-4",
    title: "Immobile 4",
    year: "2025",
    status: "2023",
    large: false,
    projectType: "Mediazione immobiliare",
    propertyType: "Metratura e servizi",
    position: "Torino, (TO)",
    details: "Residenziale",
    description:
      "Ogni progetto nasce da un'esigenza reale: definiamo il percorso e lo sviluppiamo con strumenti concreti e obiettivi misurabili.",
  },
  {
    slug: "immobile-5",
    title: "Immobile 5",
    year: "2025",
    status: "2024",
    large: true,
    projectType: "Compravendita",
    propertyType: "Metratura e servizi",
    position: "Torino, (TO)",
    details: "Residenziale",
    description:
      "Coordiniamo professionisti, verifiche e trattativa per ottenere un processo piu fluido e una conclusione coerente con gli obiettivi.",
  },
  {
    slug: "immobile-6",
    title: "Immobile 6",
    year: "2025",
    status: "2025",
    large: true,
    projectType: "Consulenza immobiliare",
    propertyType: "Metratura e servizi",
    position: "Torino, (TO)",
    details: "Residenziale",
    description:
      "Supportiamo decisioni importanti con un approccio consulenziale orientato alla chiarezza, alla sostenibilita e alla qualita del risultato.",
  },
  {
    slug: "immobile-7",
    title: "Immobile 7",
    year: "2025",
    status: "2026",
    large: true,
    projectType: "Mediazione immobiliare",
    propertyType: "Metratura e servizi",
    position: "Torino, (TO)",
    details: "Residenziale",
    description:
      "Dalla prima analisi alla finalizzazione, accompagniamo il cliente con metodo, attenzione ai dettagli e visione strategica.",
  },
  {
    slug: "immobile-8",
    title: "Immobile 8",
    year: "2025",
    status: "2026",
    large: false,
    projectType: "Compravendita",
    propertyType: "Metratura e servizi",
    position: "Torino, (TO)",
    details: "Residenziale",
    description:
      "Ogni passaggio viene costruito per ridurre incertezza e complessita, mantenendo controllo e trasparenza lungo tutto il percorso.",
  },
];

export function getImmobileBySlug(slug: string) {
  return immobili.find((item) => item.slug === slug);
}
