-- Seed data for categories
INSERT INTO categories (id, name, description, image, product_count)
VALUES
  ('clothing', 'Clothing', 'Discover our collection of stylish and comfortable clothing for all occasions.', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000', 42),
  ('electronics', 'Electronics', 'Explore the latest gadgets and electronics to enhance your digital lifestyle.', 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000', 38),
  ('accessories', 'Accessories', 'Complete your look with our range of fashionable accessories and jewelry.', 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=1000', 27),
  ('home', 'Home & Living', 'Transform your space with our curated selection of home decor and essentials.', 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000', 31);

-- Seed data for products
INSERT INTO products (id, name, description, price, discount, image, category, category_id, featured, new, rating, reviews, stock)
VALUES
  ('1', 'Premium Wireless Headphones', 'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions.', 299.99, 15, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000', 'Electronics', 'electronics', TRUE, TRUE, 4.8, 156, 23),
  ('2', 'Smart Fitness Watch', 'Track your fitness goals with our advanced smart watch. Features include heart rate monitoring, sleep tracking, GPS, and water resistance up to 50 meters.', 199.99, NULL, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000', 'Electronics', 'electronics', TRUE, FALSE, 4.6, 89, 15),
  ('3', 'Casual Cotton T-Shirt', 'Stay comfortable and stylish with our premium cotton t-shirt. Made from 100% organic cotton, it''s soft, breathable, and perfect for everyday wear.', 29.99, 10, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000', 'Clothing', 'clothing', FALSE, FALSE, 4.5, 210, 100),
  ('4', 'Designer Leather Wallet', 'Elegant and functional leather wallet with multiple card slots, bill compartments, and RFID protection. Made from genuine leather that ages beautifully.', 59.99, NULL, 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000', 'Accessories', 'accessories', TRUE, FALSE, 4.7, 67, 30),
  ('5', 'Slim Fit Denim Jeans', 'Classic slim fit jeans that combine style and comfort. Made from high-quality denim with just the right amount of stretch for all-day comfort.', 79.99, 20, 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000', 'Clothing', 'clothing', FALSE, FALSE, 4.4, 132, 45),
  ('6', 'Portable Bluetooth Speaker', 'Take your music anywhere with this compact yet powerful Bluetooth speaker. Features 12-hour battery life, waterproof design, and impressive bass response.', 89.99, NULL, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000', 'Electronics', 'electronics', FALSE, TRUE, 4.3, 78, 18),
  ('7', 'Polarized Sunglasses', 'Protect your eyes in style with our polarized sunglasses. Featuring UV400 protection, lightweight frame, and classic design that suits any face shape.', 129.99, 15, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000', 'Accessories', 'accessories', FALSE, FALSE, 4.6, 94, 27),
  ('8', 'Cozy Knit Sweater', 'Stay warm and fashionable with our soft knit sweater. Perfect for layering, this versatile piece features a relaxed fit and premium yarn for lasting comfort.', 69.99, NULL, 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000', 'Clothing', 'clothing', TRUE, FALSE, 4.5, 116, 32);
