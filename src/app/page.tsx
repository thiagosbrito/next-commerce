import { MainLayout } from "@/components/layout/main-layout";
import { HeroSection } from "@/components/ui/hero-section";
import { FeaturedProducts } from "@/components/ui/featured-products";
import { CategoriesSection } from "@/components/ui/categories-section";
import { NewsletterSection } from "@/components/ui/newsletter-section";
import { getSupabaseFeaturedProducts, getSupabaseNewProducts, getSupabaseCategories } from "@/lib/supabase-data";

// Add global styles for the grid pattern
import "./grid-pattern.css";

export default async function Home() {
  try {
    // Fetch initial data on the server
    const initialFeaturedProducts = await getSupabaseFeaturedProducts();
    const initialNewProducts = await getSupabaseNewProducts();
    const initialCategories = await getSupabaseCategories();

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
          products={initialFeaturedProducts}
        />
        
        <CategoriesSection
          title="Shop by Category"
          subtitle="Find exactly what you need by browsing our product categories"
          categories={initialCategories}
        />
        
        <FeaturedProducts
          title="New Arrivals"
          subtitle="The latest additions to our collection"
          products={initialNewProducts}
          viewAllLink="/products/new"
          isNewProducts={true}
        />
        
        <NewsletterSection />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    // Return a fallback UI in case of error
    return (
      <MainLayout>
        <div className="container mx-auto py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Loading store data...</h2>
          <p>Please check your connection to the Supabase database.</p>
        </div>
      </MainLayout>
    );
  }
}
