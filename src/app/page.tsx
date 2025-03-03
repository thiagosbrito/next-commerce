import { MainLayout } from "@/components/layout/main-layout";
import { HeroSection } from "@/components/ui/hero-section";
import { FeaturedProducts } from "@/components/ui/featured-products";
import { CategoriesSection } from "@/components/ui/categories-section";
import { NewsletterSection } from "@/components/ui/newsletter-section";
import { getFeaturedProducts, getNewProducts } from "@/lib/data/products";
import { getAllCategories } from "@/lib/data/categories";

// Add global styles for the grid pattern
import "./grid-pattern.css";

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();
  const categories = getAllCategories();

  return (
    <MainLayout>
      <HeroSection
        title="Discover Quality Products for Every Lifestyle"
        subtitle="Shop the latest trends and must-have items with free shipping on orders over $50"
        ctaText="Shop Now"
        ctaLink="/products"
        imageSrc="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000"
      />
      
      <FeaturedProducts
        title="Featured Products"
        subtitle="Handpicked favorites just for you"
        products={featuredProducts}
      />
      
      <CategoriesSection
        title="Shop by Category"
        subtitle="Find exactly what you need by browsing our product categories"
        categories={categories}
      />
      
      <FeaturedProducts
        title="New Arrivals"
        subtitle="The latest additions to our collection"
        products={newProducts}
        viewAllLink="/products/new"
      />
      
      <NewsletterSection />
    </MainLayout>
  );
}
