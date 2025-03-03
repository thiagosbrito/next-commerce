'use client';

import { useQuery } from '@tanstack/react-query';
import { createClientComponentClient } from '../supabase';
import { Category } from '../data/categories';
import { Product } from '../data/products';

// Supabase client for client components
const supabase = createClientComponentClient();

// Query keys
export const queryKeys = {
  categories: ['categories'],
  category: (id: string) => ['category', id],
  products: ['products'],
  featuredProducts: ['products', 'featured'],
  newProducts: ['products', 'new'],
  productsByCategory: (categoryId: string) => ['products', 'category', categoryId],
  product: (id: string) => ['product', id],
};

// Fetch all categories
export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      
      if (error) {
        console.error('Error fetching categories:', error);
        throw new Error(error.message);
      }
      
      return data.map(category => ({
        id: category.id,
        name: category.name,
        description: category.description,
        image: category.image,
        productCount: category.product_count
      }));
    }
  });
}

// Fetch a category by ID
export function useCategory(id: string) {
  return useQuery({
    queryKey: queryKeys.category(id),
    queryFn: async (): Promise<Category | null> => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error || !data) {
        console.error('Error fetching category:', error);
        return null;
      }
      
      return {
        id: data.id,
        name: data.name,
        description: data.description,
        image: data.image,
        productCount: data.product_count
      };
    },
    enabled: !!id
  });
}

// Fetch all products
export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) {
        console.error('Error fetching products:', error);
        throw new Error(error.message);
      }
      
      return data.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discount || undefined,
        image: product.image,
        category: product.category,
        categoryId: product.category_id,
        featured: product.featured || undefined,
        new: product.new || undefined,
        rating: product.rating,
        reviews: product.reviews,
        stock: product.stock
      }));
    }
  });
}

// Fetch featured products
export function useFeaturedProducts() {
  return useQuery({
    queryKey: queryKeys.featuredProducts,
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true);
      
      if (error) {
        console.error('Error fetching featured products:', error);
        throw new Error(error.message);
      }
      
      return data.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discount || undefined,
        image: product.image,
        category: product.category,
        categoryId: product.category_id,
        featured: product.featured || undefined,
        new: product.new || undefined,
        rating: product.rating,
        reviews: product.reviews,
        stock: product.stock
      }));
    }
  });
}

// Fetch new products
export function useNewProducts() {
  return useQuery({
    queryKey: queryKeys.newProducts,
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('new', true);
      
      if (error) {
        console.error('Error fetching new products:', error);
        throw new Error(error.message);
      }
      
      return data.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discount || undefined,
        image: product.image,
        category: product.category,
        categoryId: product.category_id,
        featured: product.featured || undefined,
        new: product.new || undefined,
        rating: product.rating,
        reviews: product.reviews,
        stock: product.stock
      }));
    }
  });
}

// Fetch products by category
export function useProductsByCategory(categoryId: string) {
  return useQuery({
    queryKey: queryKeys.productsByCategory(categoryId),
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryId);
      
      if (error) {
        console.error('Error fetching products by category:', error);
        throw new Error(error.message);
      }
      
      return data.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discount || undefined,
        image: product.image,
        category: product.category,
        categoryId: product.category_id,
        featured: product.featured || undefined,
        new: product.new || undefined,
        rating: product.rating,
        reviews: product.reviews,
        stock: product.stock
      }));
    },
    enabled: !!categoryId
  });
}

// Fetch a product by ID
export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error || !data) {
        console.error('Error fetching product:', error);
        return null;
      }
      
      return {
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        discount: data.discount || undefined,
        image: data.image,
        category: data.category,
        categoryId: data.category_id,
        featured: data.featured || undefined,
        new: data.new || undefined,
        rating: data.rating,
        reviews: data.reviews,
        stock: data.stock
      };
    },
    enabled: !!id
  });
} 