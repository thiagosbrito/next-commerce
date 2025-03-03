"use client";

import { ProductCard } from "@/components/ui/product-card";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  discount?: number;
  image: string;
  category: string;
}

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
}

export function FeaturedProducts({
  title,
  subtitle,
  products,
  viewAllLink = "/products",
}: FeaturedProductsProps) {
  return (
    <section className="py-16 md:py-24 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight relative inline-block">
              {title}
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full"></span>
            </h2>
            {subtitle && (
              <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="mt-6 md:mt-0 group flex items-center text-base font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View all products
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
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <div key={product.id} className="group transform transition-all duration-300 hover:-translate-y-2">
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                discount={product.discount}
                image={product.image}
                category={product.category}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 