'use client'
import { Moon, Sun, ToggleLeftIcon, ToggleRight, ToggleRightIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export default function ToggleClient() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex space-x-1 items-center">
      <p className="font-roboto">modo oscuro:</p>
      <div>
        {
          mounted && theme !== 'light' ?
            <Button onClick={() => setTheme("light")} variant="ghost" size="icon" className="">
              {/* <Sun className="size-[1rem] text-white rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /> */}
              <ToggleRightIcon className="size-8 mt-2" />
            </Button>
            :
            <Button onClick={() => setTheme("dark")} variant="ghost" size="icon" className="">
              {/* <Moon className="absolute size-[1rem] text-gray-800 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
              <ToggleLeftIcon className="size-8 mt-2" />
            </Button>
        }
      </div>


    </div>


  );
}
