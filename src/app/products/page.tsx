"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { ProductCard } from "@/components/ui/product-card";
import { products } from "@/lib/data/products";
import { getAllCategories } from "@/lib/data/categories";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Filter, 
  SlidersHorizontal, 
  ChevronDown, 
  X, 
  Search,
  Grid2X2,
  Grid3X3
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

// Add a unique key to help with hydration
export default function ProductsPage() {
  // Add client-side only state initialization
  const [isClient, setIsClient] = useState(false);
  const categories = getAllCategories();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortOption, setSortOption] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [gridView, setGridView] = useState<'grid3' | 'grid2'>('grid3');

  // Use useEffect to mark when component is mounted on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filter and sort products
  useEffect(() => {
    if (!isClient) return; // Skip on server-side

    let result = [...products];
    
    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.categoryId)
      );
    }
    
    // Filter by price range
    result = result.filter(product => {
      const finalPrice = product.discount 
        ? product.price - (product.price * product.discount / 100) 
        : product.price;
      return finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
    });
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Sort products
    switch (sortOption) {
      case "newest":
        // In a real app, you'd sort by date
        break;
      case "price-low":
        result.sort((a, b) => {
          const priceA = a.discount ? a.price - (a.price * a.discount / 100) : a.price;
          const priceB = b.discount ? b.price - (b.price * b.discount / 100) : b.price;
          return priceA - priceB;
        });
        break;
      case "price-high":
        result.sort((a, b) => {
          const priceA = a.discount ? a.price - (a.price * a.discount / 100) : a.price;
          const priceB = b.discount ? b.price - (b.price * b.discount / 100) : b.price;
          return priceB - priceA;
        });
        break;
      default: // featured
        result = result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategories, priceRange, sortOption, searchQuery, isClient]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 500]);
    setSearchQuery("");
    setSortOption("featured");
  };

  return (
    <MainLayout>
      <div className="container max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Page header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Shop Our Products</h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-muted-foreground max-w-2xl">
              Browse our collection of high-quality products. Use the filters to find exactly what you&apos;re looking for.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </span>
            </div>
          </div>
        </div>
        
        {/* Search and filter controls - mobile - only show when client-side */}
        {isClient && (
          <div className="lg:hidden mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 rounded-full"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filters
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
              
              <div className="flex items-center gap-2">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border rounded-full px-3 py-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                
                <div className="flex border rounded-full overflow-hidden">
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
              </div>
            </div>
            
            {/* Mobile filters */}
            {showFilters && (
              <div className="bg-accent/10 p-4 rounded-xl space-y-6 animate-in slide-in-from-top">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Categories</h3>
                    {selectedCategories.length > 0 && (
                      <button 
                        onClick={() => setSelectedCategories([])}
                        className="text-sm text-primary hover:underline"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`mobile-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => toggleCategory(category.id)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label 
                          htmlFor={`mobile-${category.id}`} 
                          className="text-sm cursor-pointer"
                        >
                          {category.name} ({category.productCount})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Price Range</h3>
                    <span className="text-sm">
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </span>
                  </div>
                  <div className="px-2 py-6">
                    <div className="relative h-2 bg-accent rounded-full">
                      <div 
                        className="absolute h-full bg-primary rounded-full"
                        style={{ 
                          left: `${(priceRange[0] / 500) * 100}%`, 
                          right: `${100 - (priceRange[1] / 500) * 100}%` 
                        }}
                      ></div>
                      <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="absolute w-full h-2 opacity-0 cursor-pointer"
                      />
                      <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="absolute w-full h-2 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearFilters}
                >
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - desktop - only show interactive elements when client-side */}
          <div className="hidden lg:block w-64 space-y-8 self-start sticky top-24">
            {isClient ? (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            ) : (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <div className="w-full pl-10 pr-4 py-2 border rounded-full bg-background h-10"></div>
              </div>
            )}
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Filters</h3>
                {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 500) && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    <X className="h-3 w-3" /> Clear all
                  </button>
                )}
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3 flex items-center justify-between">
                    Categories
                    {selectedCategories.length > 0 && (
                      <button 
                        onClick={() => setSelectedCategories([])}
                        className="text-xs text-primary hover:underline"
                      >
                        Clear
                      </button>
                    )}
                  </h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={category.id}
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => toggleCategory(category.id)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label 
                          htmlFor={category.id} 
                          className="text-sm cursor-pointer flex-1 flex items-center justify-between"
                        >
                          <span>{category.name}</span>
                          <span className="text-muted-foreground">({category.productCount})</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3 flex items-center justify-between">
                    Price Range
                    <span className="text-xs text-muted-foreground">
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </span>
                  </h4>
                  <div className="px-2 py-6">
                    <div className="relative h-2 bg-accent rounded-full">
                      <div 
                        className="absolute h-full bg-primary rounded-full"
                        style={{ 
                          left: `${(priceRange[0] / 500) * 100}%`, 
                          right: `${100 - (priceRange[1] / 500) * 100}%` 
                        }}
                      ></div>
                      <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="absolute w-full h-2 opacity-0 cursor-pointer"
                      />
                      <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="absolute w-full h-2 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Desktop sorting controls - only show interactive elements when client-side */}
            <div className="hidden lg:flex justify-between items-center mb-6 pb-4 border-b">
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
            
            {/* Selected filters */}
            {isClient && (selectedCategories.length > 0 || searchQuery) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map(categoryId => {
                  const category = categories.find(c => c.id === categoryId);
                  return category ? (
                    <div 
                      key={categoryId}
                      className="flex items-center gap-1 bg-accent/50 text-sm rounded-full px-3 py-1"
                    >
                      <span>{category.name}</span>
                      <button onClick={() => toggleCategory(categoryId)}>
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : null;
                })}
                
                {searchQuery && (
                  <div className="flex items-center gap-1 bg-accent/50 text-sm rounded-full px-3 py-1">
                    <span>&quot;{searchQuery}&quot;</span>
                    <button onClick={() => setSearchQuery("")}>
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* No results */}
            {isClient && filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-accent/10 rounded-xl">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            )}
            
            {/* Products grid */}
            <div className={`grid ${
              gridView === 'grid3' || !isClient
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'grid-cols-1 md:grid-cols-2 gap-8'
            }`}>
              {filteredProducts.map((product) => (
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
        </div>
      </div>
    </MainLayout>
  );
} 