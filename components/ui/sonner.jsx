"use client";
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    (<Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-black/10 group-[.toaster]:backdrop-blur-lg group-[.toaster]:border group-[.toaster]:border-white/20 group-[.toaster]:shadow-lg group-[.toaster]:text-white",
          description: "group-[.toast]:text-white/80",
          actionButton:
            "group-[.toast]:bg-white/20 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-white/10 group-[.toast]:text-white",
        },
      }}
      {...props} />)
  );
}

export { Toaster }
