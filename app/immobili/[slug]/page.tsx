import { notFound } from "next/navigation";
import { getImmobileBySlug, immobili } from "@/lib/immobili";
import ImmobileDetailClient from "./ImmobileDetailClient";

type ImmobilePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return immobili.map((item) => ({ slug: item.slug }));
}

export default async function ImmobileDetailPage({ params }: ImmobilePageProps) {
  const { slug } = await params;
  const immobile = getImmobileBySlug(slug);

  if (!immobile) {
    notFound();
  }

  return <ImmobileDetailClient immobile={immobile} />;
}

