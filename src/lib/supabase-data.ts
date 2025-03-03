import { createServerComponentClient } from './supabase';
import { Category } from './data/categories';
import { Product } from './data/products';

// Fetch all categories from Supabase
export async function getSupabaseCategories(): Promise<Category[]> {
  const supabase = await createServerComponentClient();
  
  const { data, error } = await supabase
    .from('categories')
    .select('*');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return data.map(category => ({
    id: category.id,
    name: category.name,
    description: category.description,
    image: category.image,
    productCount: category.product_count
  }));
}

// Fetch a category by ID from Supabase
export async function getSupabaseCategoryById(id: string): Promise<Category | null> {
  const supabase = await createServerComponentClient();
  
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
}

// Fetch all products from Supabase
export async function getSupabaseProducts(): Promise<Product[]> {
  const supabase = await createServerComponentClient();
  
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
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

// Fetch featured products from Supabase
export async function getSupabaseFeaturedProducts(): Promise<Product[]> {
  const supabase = await createServerComponentClient();
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true);
  
  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
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

// Fetch new products from Supabase
export async function getSupabaseNewProducts(): Promise<Product[]> {
  const supabase = await createServerComponentClient();
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('new', true);
  
  if (error) {
    console.error('Error fetching new products:', error);
    return [];
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

// Fetch products by category from Supabase
export async function getSupabaseProductsByCategory(categoryId: string): Promise<Product[]> {
  const supabase = await createServerComponentClient();
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId);
  
  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
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

// Fetch a product by ID from Supabase
export async function getSupabaseProductById(id: string): Promise<Product | null> {
  const supabase = await createServerComponentClient();
  
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
} 