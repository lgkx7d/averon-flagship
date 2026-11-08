import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { COLLECTIONS, PRODUCTS } from '@/data/products';
import { ArrowLeft } from 'lucide-react';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({
    slug: c.slug,
  }));
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  const categoryProducts =
    collection.slug === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === collection.category);

  return (
    <>
      <Header />
      <main className="w-full min-h-screen bg-[#080808] pt-32 pb-36 px-6 md:px-12 select-none">
        <div className="w-full max-w-[1920px] mx-auto">
          {/* Back link */}
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#777777] hover:text-white transition-colors mb-8 uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO ALL CHAPTERS</span>
          </Link>

          {/* Editorial Banner */}
          <div className="relative w-full h-[45vh] md:h-[55vh] bg-[#0B0B0B] border border-white/10 overflow-hidden mb-16 flex flex-col justify-end p-8 md:p-16">
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              priority
              sizes="100vw"
              className="object-cover grayscale contrast-125 brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />

            <div className="relative z-10 max-w-2xl space-y-3">
              <div className="text-[10px] font-mono tracking-[0.3em] text-[#777777] uppercase">
                CHAPTER {collection.number} // {collection.subtitle}
              </div>
              <h1 className="font-monumental text-5xl sm:text-7xl md:text-8xl uppercase text-white tracking-[-0.035em] leading-[0.88]">
                {collection.name}
              </h1>
              <p className="text-xs md:text-sm font-mono text-[#C8C8C8] leading-relaxed">
                {collection.description}
              </p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono text-[#777777] uppercase tracking-wider">
            <span>SPECIMENS ALLOCATED: {categoryProducts.length}</span>
            <span>EDITION 01: MONOLITH</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {categoryProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} priority={idx < 4} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
