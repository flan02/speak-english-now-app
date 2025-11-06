import { LanguagesIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <div className="xl:ml-72 2xl:mx-auto flex max-w-7xl items-end justify-between gap-3 xl:px-0 2xl:px-0 p-4 xl:py-2 mt-4">
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