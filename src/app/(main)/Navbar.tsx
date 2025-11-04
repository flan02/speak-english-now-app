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
      <div className="xl:ml-72 2xl:mx-auto flex max-w-7xl items-end justify-between gap-3 px-1 py-4 xl:py-2 mt-4">
        <Link href="/inicio" className="flex items-center gap-2 dark:td">
          <LanguagesIcon className="" />
          <div className="">
            <span className="text-base lg:text-xl font-bold text-lime-950">HABLA</span>
            <span className="text-base lg:text-xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">INGLES</span>
            <span className="text-bas lg:text-xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">YA</span>
          </div>

        </Link>
        <div className="flex items-center space-x-6">
        </div>
      </div>
    </header>
  );
}