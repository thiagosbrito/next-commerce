"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Dummy cart data
const initialCartItems = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    discount: 15,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
    quantity: 1,
  },
  {
    id: "4",
    name: "Designer Leather Wallet",
    price: 59.99,
    discount: 0,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000",
    quantity: 2,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.discount
        ? item.price - item.price * (item.discount / 100)
        : item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <MainLayout>
      <div className="container py-8 md:py-12 px-4 sm:px-6 lg:px-8 mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Button asChild>
              <Link href="/products">
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="bg-muted px-4 py-3">
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 divide-y">
                  {cartItems.map((item) => {
                    const itemPrice = item.discount
                      ? item.price - item.price * (item.discount / 100)
                      : item.price;
                    const itemTotal = itemPrice * item.quantity;

                    return (
                      <div key={item.id} className="p-4">
                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-6">
                            <div className="flex items-center gap-4">
                              <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <Link
                                  href={`/products/${item.id}`}
                                  className="font-medium hover:underline line-clamp-1"
                                >
                                  {item.name}
                                </Link>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeItem(item.id)}
                                  className="h-auto p-0 text-sm text-muted-foreground hover:text-destructive flex items-center mt-1"
                                >
                                  <X className="h-3 w-3 mr-1" />
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">
                            <div>
                              <span className="font-medium">
                                {formatPrice(itemPrice)}
                              </span>
                              {item.discount > 0 && (
                                <div className="text-xs text-muted-foreground line-through">
                                  {formatPrice(item.price)}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="flex items-center justify-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-l"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <div className="h-8 px-3 border-t border-b flex items-center justify-center">
                                {item.quantity}
                              </div>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-r"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="col-span-2 text-right font-medium">
                            {formatPrice(itemTotal)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium">Order Summary</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button className="w-full">
                    Proceed to Checkout
                  </Button>
                  
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/products">
                      Continue Shopping
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 