"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { useState } from "react";
import { User, Package, Heart, CreditCard, LogOut } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dummy user data
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000",
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <MainLayout>
      <div className="container py-8 md:py-12 px-4 sm:px-6 lg:px-8 mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="overflow-hidden">
              <CardHeader className="pb-4 border-b flex flex-col items-center space-y-4">
                <Avatar className="h-20 w-20 border-2 border-primary/10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="font-semibold text-lg">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  onClick={() => setActiveTab("profile")}
                  className="w-full justify-start"
                >
                  <User className="h-4 w-4 mr-2" />
                  <span>Profile</span>
                </Button>
                <Button
                  variant={activeTab === "orders" ? "default" : "ghost"}
                  onClick={() => setActiveTab("orders")}
                  className="w-full justify-start"
                >
                  <Package className="h-4 w-4 mr-2" />
                  <span>Orders</span>
                </Button>
                <Button
                  variant={activeTab === "wishlist" ? "default" : "ghost"}
                  onClick={() => setActiveTab("wishlist")}
                  className="w-full justify-start"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  <span>Wishlist</span>
                </Button>
                <Button
                  variant={activeTab === "payment" ? "default" : "ghost"}
                  onClick={() => setActiveTab("payment")}
                  className="w-full justify-start"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span>Payment Methods</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive mt-2"
                  asChild
                >
                  <Link href="/">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-medium">
                  {activeTab === "profile" && "Profile Information"}
                  {activeTab === "orders" && "Order History"}
                  {activeTab === "wishlist" && "My Wishlist"}
                  {activeTab === "payment" && "Payment Methods"}
                </h2>
              </CardHeader>
              <CardContent className="p-6">
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Full Name
                        </label>
                        <Input
                          type="text"
                          defaultValue={user.name}
                          className="max-w-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          defaultValue={user.email}
                          className="max-w-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          className="max-w-md"
                        />
                      </div>
                    </div>
                    <div>
                      <Button>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div>
                    <h2 className="text-xl font-medium mb-6">Order History</h2>
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted px-4 py-3 text-sm font-medium grid grid-cols-12 gap-4">
                        <div className="col-span-3">Order ID</div>
                        <div className="col-span-3">Date</div>
                        <div className="col-span-3">Status</div>
                        <div className="col-span-3 text-right">Total</div>
                      </div>
                      <div className="divide-y">
                        <div className="px-4 py-3 grid grid-cols-12 gap-4">
                          <div className="col-span-3">#ORD-12345</div>
                          <div className="col-span-3">May 15, 2023</div>
                          <div className="col-span-3">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              Delivered
                            </span>
                          </div>
                          <div className="col-span-3 text-right">$299.99</div>
                        </div>
                        <div className="px-4 py-3 grid grid-cols-12 gap-4">
                          <div className="col-span-3">#ORD-12346</div>
                          <div className="col-span-3">April 22, 2023</div>
                          <div className="col-span-3">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              Shipped
                            </span>
                          </div>
                          <div className="col-span-3 text-right">$159.99</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "wishlist" && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Items added to your wishlist will appear here. Start browsing our products to add items you love.
                    </p>
                    <Button asChild>
                      <Link href="/products">Browse Products</Link>
                    </Button>
                  </div>
                )}

                {activeTab === "payment" && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No payment methods</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      You haven&apos;t added any payment methods yet. Add a payment method to make checkout faster.
                    </p>
                    <Button>
                      Add Payment Method
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 