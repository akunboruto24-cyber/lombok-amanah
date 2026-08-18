import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTourBySlug, getTourPackages, getSettings } from '@/lib/data';
import { TourDetailContent } from '@/components/pages/TourDetailContent';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return { title: 'Tour Not Found' };
  return {
    title: tour.seo_title || tour.name,
    description: tour.seo_description || tour.description?.substring(0, 160),
    keywords: tour.seo_keywords,
  };
}

export async function generateStaticParams() {
  const tours = await getTourPackages();
  return tours.map((tour) => ({ slug: tour.slug }));
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  const settings = await getSettings();

  return <TourDetailContent tour={tour} settings={settings} />;
}
