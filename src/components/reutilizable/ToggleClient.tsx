'use client'
import { ToggleLeftIcon, ToggleRightIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ToggleClient() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setCurrentTheme(savedTheme);
  }, [])

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
      setCurrentTheme(theme);
    }
  }, [theme]);

  if (!mounted) return null; // avoid blinking

  const isDark = currentTheme === "dark"

  return (
    <div className="flex space-x-1 items-center mb-1">
      <p className="font-roboto underline font-bold uppercase text-xs">modo oscuro:</p>
      <div>
        {
          isDark ?
            <Button onClick={() => setTheme("light")} variant="ghost" size="icon" className="">
              {/* <Sun className="size-[1rem] text-white rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /> */}
              <ToggleRightIcon className="size-6 mt-1" />
            </Button>
            :
            <Button onClick={() => setTheme("dark")} variant="ghost" size="icon" className="">
              {/* <Moon className="absolute size-[1rem] text-gray-800 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
              <ToggleLeftIcon className="size-6 mt-1" />
            </Button>
        }
      </div>
    </div>
  )
}
