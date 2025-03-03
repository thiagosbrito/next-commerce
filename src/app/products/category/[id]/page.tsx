"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { ProductCard } from "@/components/ui/product-card";
import { getProductsByCategory } from "@/lib/data/products";
import { getCategoryById } from "@/lib/data/categories";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, SlidersHorizontal, Grid2X2, Grid3X3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [isClient, setIsClient] = useState(false);
  const category = getCategoryById(params.id);
  
  if (!category) {
    notFound();
  }
  
  const products = getProductsByCategory(params.id);
  const [sortOption, setSortOption] = useState("featured");
  const [gridView, setGridView] = useState<'grid3' | 'grid2'>('grid3');
  
  // Use useEffect to mark when component is mounted on client
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Sort products based on selected option - only run on client
  const sortedProducts = isClient 
    ? [...products].sort((a, b) => {
        switch (sortOption) {
          case "price-low":
            const priceA = a.discount ? a.price - (a.price * a.discount / 100) : a.price;
            const priceB = b.discount ? b.price - (b.price * b.discount / 100) : b.price;
            return priceA - priceB;
          case "price-high":
            const priceAHigh = a.discount ? a.price - (a.price * a.discount / 100) : a.price;
            const priceBHigh = b.discount ? b.price - (b.price * b.discount / 100) : b.price;
            return priceBHigh - priceAHigh;
          case "newest":
            // In a real app, you'd sort by date
            return b.new ? 1 : -1;
          default: // featured
            return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
      })
    : products; // Use unsorted products on server

  return (
    <MainLayout>
      <div className="container max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{category.name}</span>
        </nav>
        
        {/* Category Header */}
        <div className="relative rounded-3xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/30 z-10" />
          <div className="relative aspect-[3/1] md:aspect-[4/1]">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 md:p-12">
            <div className="max-w-2xl">
              <Link 
                href="/products" 
                className="inline-flex items-center text-sm font-medium text-primary mb-4 hover:underline"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to all products
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">{category.name}</h1>
              <p className="text-lg text-muted-foreground max-w-xl">{category.description}</p>
              <div className="mt-6 flex items-center">
                <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {category.productCount} Products
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sorting Controls - Only show interactive elements when client-side */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Sort by:</span>
            {isClient ? (
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border-none text-sm focus:outline-none focus:ring-0 p-0 bg-transparent"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            ) : (
              <span className="text-sm">Featured</span>
            )}
          </div>
          
          {isClient ? (
            <div className="flex border rounded-md overflow-hidden">
              <button 
                onClick={() => setGridView('grid3')}
                className={`p-2 ${gridView === 'grid3' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setGridView('grid2')}
                className={`p-2 ${gridView === 'grid2' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
              >
                <Grid2X2 className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex border rounded-md overflow-hidden">
              <div className="p-2 bg-primary text-primary-foreground">
                <Grid3X3 className="h-4 w-4" />
              </div>
              <div className="p-2 bg-background">
                <Grid2X2 className="h-4 w-4" />
              </div>
            </div>
          )}
        </div>
        
        {/* No products message */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-16 bg-accent/10 rounded-xl">
            <h3 className="text-lg font-medium mb-2">No products found in this category</h3>
            <p className="text-muted-foreground mb-4">
              Check back later or browse our other categories
            </p>
            <Button asChild variant="outline">
              <Link href="/products">View all products</Link>
            </Button>
          </div>
        )}
        
        {/* Products Grid */}
        <div className={`grid ${
          gridView === 'grid3' || !isClient
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'grid-cols-1 md:grid-cols-2 gap-8'
        }`}>
          {sortedProducts.map((product) => (
            <div key={product.id} className="group transform transition-all duration-300 hover:-translate-y-1">
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
    </MainLayout>
  );
} 