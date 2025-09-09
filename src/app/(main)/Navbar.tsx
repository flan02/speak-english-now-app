//'use client'
import SignOut from "@/components/reutilizable/sign-out";
import logo from "../../../public/logo.png";
import ThemeToggle from "@/components/reutilizable/ThemeToggle";
import { LanguagesIcon } from "lucide-react";

//import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  //const { theme } = useTheme();

  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-3 p-3">
        <Link href="/resumes" className="flex items-center gap-2 dark:td">
          {/* <Image
            src={logo}
            alt="Logo"
            width={35}
            height={35}
            className="rounded-full"
          /> */}

          <LanguagesIcon />
          <div>
            <span className="text-xs lg:text-xl font-bold text-lime-950">HABLA</span>
            <span className="text-xs lg:text-xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">INGLES</span>
            <span className="text-xs lg:text-xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">YA</span>
          </div>

        </Link>
        <div className="flex items-center space-x-6">
          <SignOut />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}