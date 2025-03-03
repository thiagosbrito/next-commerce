"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useState } from "react";
import { formatPrice, getDiscountedPrice } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  discount?: number;
  image: string;
  category: string;
}

export function ProductCard({ id, name, price, discount = 0, image, category }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const finalPrice = discount > 0 ? getDiscountedPrice(price, discount) : price;

  return (
    <Link href={`/products/${id}`} className="group">
      <Card className="overflow-hidden border bg-background transition-colors hover:bg-accent/10">
        <div className="relative aspect-square">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <button
            className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 backdrop-blur-sm transition-colors hover:bg-background"
            onClick={toggleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`h-5 w-5 ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-foreground"
              }`}
            />
          </button>
          {discount > 0 && (
            <div className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
              {discount}% OFF
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-foreground line-clamp-1">{name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{category}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center gap-2">
            <span className="font-medium">{formatPrice(finalPrice)}</span>
            {discount > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(price)}
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
} 