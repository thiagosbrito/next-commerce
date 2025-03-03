-- Create categories table
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  product_count INTEGER NOT NULL DEFAULT 0
);

-- Create products table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  discount DECIMAL(5, 2),
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES categories(id),
  featured BOOLEAN DEFAULT FALSE,
  new BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3, 1) NOT NULL,
  reviews INTEGER NOT NULL DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_featured ON products(featured) WHERE featured = TRUE;
CREATE INDEX idx_products_new ON products(new) WHERE new = TRUE;
