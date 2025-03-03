"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export function ThemeToggle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Only show the toggle after component is mounted on the client
  // This prevents hydration mismatch between server and client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and initial client render, use a neutral state
  if (!mounted) {
    return (
      <div
        className={cn(
          "flex items-center space-x-2 cursor-pointer",
          className
        )}
        {...props}
      >
        <Sun className="h-5 w-5 transition-all text-muted-foreground" />
        <Moon className="h-5 w-5 transition-all text-muted-foreground" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center space-x-2 cursor-pointer",
        className
      )}
      {...props}
    >
      <Sun
        onClick={() => setTheme("light")}
        className={cn(
          "h-5 w-5 transition-all",
          theme === "dark" ? "text-muted-foreground" : "text-foreground"
        )}
      />
      <Moon
        onClick={() => setTheme("dark")}
        className={cn(
          "h-5 w-5 transition-all",
          theme === "light" ? "text-muted-foreground" : "text-foreground"
        )}
      />
    </div>
  );
} 