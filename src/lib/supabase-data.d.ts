import { Category } from './data/categories';
import { Product } from './data/products';

export function getSupabaseCategories(): Promise<Category[]>;
export function getSupabaseCategoryById(id: string): Promise<Category | null>;
export function getSupabaseProducts(): Promise<Product[]>;
export function getSupabaseFeaturedProducts(): Promise<Product[]>;
export function getSupabaseNewProducts(): Promise<Product[]>;
export function getSupabaseProductsByCategory(categoryId: string): Promise<Product[]>;
export function getSupabaseProductById(id: string): Promise<Product | null>; 