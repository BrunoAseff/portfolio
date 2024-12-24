"use client";
import { Button } from "@/components/ui/button";
import { SunDim, MoonStars } from "phosphor-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  function handleThemeChange() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  if (!theme) return null;

  return (
    <Button
      onClick={() => handleThemeChange()}
      className={`absolute bg-transparent top-4 left-4 md:top-10 md:right-10 md:left-auto p-2`}
      variant="outline"
      size="icon"
    >
      {theme === "dark" ? (
        <SunDim color="#d1d5db" size={32} />
      ) : (
        <MoonStars size={32} />
      )}
    </Button>
  );
}
