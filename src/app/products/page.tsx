"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { ProductCard } from "@/components/ui/product-card";
import { useProducts } from "@/lib/hooks/use-queries";
import { useCategories } from "@/lib/hooks/use-queries";
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
  const { data: categories = [], isLoading: isCategoriesLoading } = useCategories();
  const { data: allProducts = [], isLoading: isProductsLoading } = useProducts();
  
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
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

  // Update filtered products when allProducts changes
  useEffect(() => {
    setFilteredProducts(allProducts);
  }, [allProducts]);

  // Filter and sort products
  useEffect(() => {
    if (!isClient) return; // Skip on server-side

    let result = [...allProducts];
    
    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.categoryId)
      );
    }
    
    // Filter by price range
    result = result.filter(product => {
      const finalPrice = product.discount 
        ? product.price * (1 - product.discount / 100) 
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
      case "price-low":
        result.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceA - priceB;
        });
        break;
      case "price-high":
        result.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceB - priceA;
        });
        break;
      case "newest":
        // In a real app, you'd sort by date
        // Here we'll just use the 'new' flag
        result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
      case "featured":
      default:
        // Sort by featured flag
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
  }, [isClient, allProducts, selectedCategories, priceRange, sortOption, searchQuery]);

  // Toggle category selection
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 500]);
    setSortOption("featured");
    setSearchQuery("");
  };

  // Loading state
  if (!isClient) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
            <p className="text-muted-foreground mt-1">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Search input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {/* Sort dropdown */}
            <div className="relative inline-block">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
            </div>
            
            {/* Grid view toggle */}
            <div className="flex items-center space-x-2 border rounded-lg p-1">
              <button
                onClick={() => setGridView('grid3')}
                className={`p-1 rounded ${gridView === 'grid3' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setGridView('grid2')}
                className={`p-1 rounded ${gridView === 'grid2' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
              >
                <Grid2X2 className="h-4 w-4" />
              </button>
            </div>
            
            {/* Mobile filter button */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar - desktop */}
          <div className={`md:w-64 lg:w-72 shrink-0 md:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="sticky top-24 space-y-6 bg-card p-6 rounded-lg border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="h-8 text-xs"
                >
                  Reset all
                </Button>
              </div>
              
              {/* Categories filter */}
              <div>
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {isCategoriesLoading ? (
                    // Loading skeleton for categories
                    Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="animate-pulse h-6 bg-gray-200 dark:bg-gray-800 rounded"></div>
                    ))
                  ) : (
                    categories.map(category => (
                      <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => toggleCategory(category.id)}
                          className="rounded text-primary focus:ring-primary"
                        />
                        <span>{category.name}</span>
                      </label>
                    ))
                  )}
                </div>
              </div>
              
              {/* Price range filter */}
              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="flex-1">
            {isProductsLoading ? (
              // Loading skeleton for products
              <div className={`grid ${gridView === 'grid3' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 lg:grid-cols-2'} gap-6`}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-800 rounded-lg h-64 mb-4"></div>
                    <div className="bg-gray-200 dark:bg-gray-800 h-6 rounded w-3/4 mb-2"></div>
                    <div className="bg-gray-200 dark:bg-gray-800 h-4 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
                <Button onClick={resetFilters}>Reset all filters</Button>
              </div>
            ) : (
              <div className={`grid ${gridView === 'grid3' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 lg:grid-cols-2'} gap-6`}>
                {filteredProducts.map(product => (
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
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 