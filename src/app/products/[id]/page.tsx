import { MainLayout } from "@/components/layout/main-layout";
import { getProductById, getFeaturedProducts } from "@/lib/data/products";
import { FeaturedProducts } from "@/components/ui/featured-products";
import { formatPrice, getDiscountedPrice } from "@/lib/utils";
import Image from "next/image";
import { Star, Truck, ShieldCheck, Heart, Share2, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = getFeaturedProducts().filter(p => p.id !== product.id).slice(0, 4);
  const discountedPrice = product.discount && product.discount > 0 
    ? getDiscountedPrice(product.price, product.discount)
    : product.price;

  return (
    <MainLayout>
      <div className="container max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <Link href={`/products/category/${product.categoryId}`} className="hover:text-primary transition-colors">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-accent/5">
              <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
              
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              
              {product.discount && product.discount > 0 && (
                <div className="absolute left-4 top-4 bg-primary text-primary-foreground text-sm font-medium px-3 py-1.5 rounded-full shadow-lg">
                  {product.discount}% OFF
                </div>
              )}
              
              {product.new && (
                <div className="absolute right-4 top-4 bg-blue-500 text-white text-sm font-medium px-3 py-1.5 rounded-full shadow-lg">
                  NEW
                </div>
              )}
              
              <div className="absolute right-4 bottom-4 flex flex-col gap-2">
                <button className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Thumbnail gallery - placeholder for future enhancement */}
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden border-2 border-primary/0 hover:border-primary/100 transition-colors cursor-pointer">
                  <div className="relative h-full w-full">
                    <Image
                      src={product.image}
                      alt={`${product.name} thumbnail ${i+1}`}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
              <div className="flex items-center gap-2 mt-3">
                <Link 
                  href={`/products/category/${product.categoryId}`}
                  className="text-sm font-medium px-3 py-1 bg-accent/50 rounded-full hover:bg-accent transition-colors"
                >
                  {product.category}
                </Link>
                
                <div className="flex items-center gap-1 ml-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground ml-1">
                    ({product.reviews})
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(discountedPrice)}
              </span>
              {product.discount && product.discount > 0 && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              )}
              {product.discount && product.discount > 0 && (
                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-md">
                  Save {formatPrice(product.price - discountedPrice)}
                </span>
              )}
            </div>

            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>{product.description}</p>
            </div>

            <div className="pt-4 border-t space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-32 text-sm font-medium">Availability:</div>
                <div className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                </div>
              </div>
              
              {product.stock > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-32 text-sm font-medium">Quantity:</div>
                  <div className="flex items-center border rounded-full overflow-hidden">
                    <button className="h-10 w-10 flex items-center justify-center hover:bg-accent transition-colors">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center">1</span>
                    <button className="h-10 w-10 flex items-center justify-center hover:bg-accent transition-colors">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="flex-1 bg-primary text-primary-foreground h-12 px-6 rounded-full font-medium hover:bg-primary/90 hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="21" r="1"/>
                  <circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
                Add to Cart
              </button>
              <button className="flex-1 border-2 border-primary/20 bg-background h-12 px-6 rounded-full font-medium text-primary hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
                <Heart className="h-5 w-5" />
                Add to Wishlist
              </button>
            </div>

            <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-accent/10">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Free standard shipping on orders over $50
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-accent/10">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your payment information is processed securely
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <FeaturedProducts
            title="You May Also Like"
            products={relatedProducts}
          />
        </div>
      </div>
    </MainLayout>
  );
} 