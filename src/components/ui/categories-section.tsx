"use client";

import Link from "next/link";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

interface CategoriesSectionProps {
  title: string;
  subtitle?: string;
  categories: Category[];
}

export function CategoriesSection({
  title,
  subtitle,
  categories,
}: CategoriesSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-accent/5">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight relative inline-flex flex-col">
            {title}
            <span className="h-1 w-24 bg-primary mx-auto mt-4 rounded-full"></span>
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products/category/${category.id}`}
              className="group"
            >
              <div className="overflow-hidden rounded-2xl shadow-lg bg-background transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-square">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h3 className="text-xl font-semibold group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                      {category.name}
                    </h3>
                    <div className="flex items-center mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-4 group-hover:translate-y-0">
                      <span className="text-sm text-white/90 font-medium">
                        {category.productCount} products
                      </span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 