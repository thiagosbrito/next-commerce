export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  image: string;
  category: string;
  categoryId: string;
  featured?: boolean;
  new?: boolean;
  rating: number;
  reviews: number;
  stock: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions.",
    price: 299.99,
    discount: 15,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
    category: "Electronics",
    categoryId: "electronics",
    featured: true,
    new: true,
    rating: 4.8,
    reviews: 156,
    stock: 23
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with our advanced smart watch. Features include heart rate monitoring, sleep tracking, GPS, and water resistance up to 50 meters.",
    price: 199.99,
    discount: 0,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000",
    category: "Electronics",
    categoryId: "electronics",
    featured: true,
    rating: 4.6,
    reviews: 89,
    stock: 15
  },
  {
    id: "3",
    name: "Casual Cotton T-Shirt",
    description: "Stay comfortable and stylish with our premium cotton t-shirt. Made from 100% organic cotton, it's soft, breathable, and perfect for everyday wear.",
    price: 29.99,
    discount: 10,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000",
    category: "Clothing",
    categoryId: "clothing",
    rating: 4.5,
    reviews: 210,
    stock: 100
  },
  {
    id: "4",
    name: "Designer Leather Wallet",
    description: "Elegant and functional leather wallet with multiple card slots, bill compartments, and RFID protection. Made from genuine leather that ages beautifully.",
    price: 59.99,
    discount: 0,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000",
    category: "Accessories",
    categoryId: "accessories",
    featured: true,
    rating: 4.7,
    reviews: 67,
    stock: 30
  },
  {
    id: "5",
    name: "Slim Fit Denim Jeans",
    description: "Classic slim fit jeans that combine style and comfort. Made from high-quality denim with just the right amount of stretch for all-day comfort.",
    price: 79.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000",
    category: "Clothing",
    categoryId: "clothing",
    rating: 4.4,
    reviews: 132,
    stock: 45
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker",
    description: "Take your music anywhere with this compact yet powerful Bluetooth speaker. Features 12-hour battery life, waterproof design, and impressive bass response.",
    price: 89.99,
    discount: 0,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000",
    category: "Electronics",
    categoryId: "electronics",
    new: true,
    rating: 4.3,
    reviews: 78,
    stock: 18
  },
  {
    id: "7",
    name: "Polarized Sunglasses",
    description: "Protect your eyes in style with our polarized sunglasses. Featuring UV400 protection, lightweight frame, and classic design that suits any face shape.",
    price: 129.99,
    discount: 15,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000",
    category: "Accessories",
    categoryId: "accessories",
    rating: 4.6,
    reviews: 94,
    stock: 27
  },
  {
    id: "8",
    name: "Cozy Knit Sweater",
    description: "Stay warm and fashionable with our soft knit sweater. Perfect for layering, this versatile piece features a relaxed fit and premium yarn for lasting comfort.",
    price: 69.99,
    discount: 0,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000",
    category: "Clothing",
    categoryId: "clothing",
    featured: true,
    rating: 4.5,
    reviews: 116,
    stock: 32
  }
];

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function getNewProducts(): Product[] {
  return products.filter(product => product.new);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(product => product.categoryId === categoryId);
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
} 