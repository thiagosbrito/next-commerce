export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "clothing",
    name: "Clothing",
    description: "Discover our collection of stylish and comfortable clothing for all occasions.",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000",
    productCount: 42
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Explore the latest gadgets and electronics to enhance your digital lifestyle.",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000",
    productCount: 38
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Complete your look with our range of fashionable accessories and jewelry.",
    image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=1000",
    productCount: 27
  },
  {
    id: "home",
    name: "Home & Living",
    description: "Transform your space with our curated selection of home decor and essentials.",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    productCount: 31
  }
];

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(category => category.id === id);
} 