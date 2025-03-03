"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally connect to a backend service
    // For now, we'll just simulate a successful submission
    setIsSubmitted(true);
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-primary opacity-95 z-0"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-primary-foreground/10 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-primary-foreground/20 shadow-2xl">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-foreground">
                Join Our Newsletter
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/90 leading-relaxed">
                Get the latest updates, exclusive offers, and product news delivered straight to your inbox.
              </p>
              
              {isSubmitted ? (
                <div className="mt-10 p-6 bg-primary-foreground/20 rounded-2xl backdrop-blur-sm border border-primary-foreground/30 transform transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="mx-auto h-12 w-12 text-primary-foreground mb-4"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p className="font-medium text-xl text-primary-foreground">Thank you for subscribing!</p>
                  <p className="mt-2 text-primary-foreground/80">
                    You&apos;ll start receiving our newsletter at <span className="font-semibold">{email}</span>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-14 rounded-full border-2 border-primary-foreground/20 bg-primary-foreground/10 px-6 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 text-base"
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    className="h-14 px-8 rounded-full text-base font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    Subscribe
                  </Button>
                </form>
              )}
              
              <p className="mt-6 text-sm text-primary-foreground/70 max-w-lg mx-auto">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 