"use client";

import Link from "next/link";
import { ShoppingCart, User, Search, Menu } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center gap-2">
          <button 
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">NextCommerce</span>
          </Link>
        </div>

        <nav className={cn(
          "absolute left-0 right-0 top-16 bg-background border-b md:static md:border-0 md:bg-transparent",
          isMenuOpen ? "block" : "hidden md:block"
        )}>
          <ul className="container flex flex-col md:flex-row items-start md:items-center gap-4 py-4 md:py-0">
            <li>
              <Link href="/products" className="text-foreground hover:text-primary transition-colors">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/products/category/clothing" className="text-foreground hover:text-primary transition-colors">
                Clothing
              </Link>
            </li>
            <li>
              <Link href="/products/category/electronics" className="text-foreground hover:text-primary transition-colors">
                Electronics
              </Link>
            </li>
            <li>
              <Link href="/products/category/accessories" className="text-foreground hover:text-primary transition-colors">
                Accessories
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Search" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </button>
          <ThemeToggle />
          <Link href="/account" aria-label="Account">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="relative" aria-label="Shopping cart">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
} 