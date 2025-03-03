"use client";

import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageSrc: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  imageSrc,
}: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/20 z-10" />
      
      {/* Background image with blur effect */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt="Background"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>
      
      <div className="container relative z-20 py-20 md:py-32 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              {title.split(' ').map((word, i) => (
                <span key={i} className={i % 3 === 0 ? "text-primary" : ""}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={ctaLink}
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {ctaText}
              </Link>
              <Link
                href="/products"
                className="inline-flex h-12 items-center justify-center rounded-full border border-primary/20 bg-background/80 backdrop-blur-sm px-8 text-base font-medium shadow-sm transition-all hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Browse All
              </Link>
            </div>
          </div>
          <div className="relative h-[350px] md:h-[450px] lg:h-[550px] rounded-2xl overflow-hidden shadow-2xl transform md:translate-x-8">
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-10" />
            <Image
              src={imageSrc}
              alt="Hero image"
              fill
              className="object-cover transition-transform hover:scale-105 duration-700"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}