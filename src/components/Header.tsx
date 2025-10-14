"use client";

import Search from "./Search";
import { BellIcon, CoffeeIcon } from "@/lib/icons";

export default function Header() {
  return (
    <header className="">
      <div className="container mx-auto flex justify-between items-center text-sm md:font-bold">
        {/* LOGO */}
        <a
          href="/"
          className="uppercase tracking-[4px] font-normal px-4 md:px-6 py-2 bg-lightbrigtgreen dark:text-dbg flex items-center"
        >
          Bigtime
        </a>

        <div className="flex items-center gap-2">
          <Search />

          <div className="flex items-center gap-2">
            <button>{<BellIcon />}</button>
            <button>{<CoffeeIcon />}</button>
          </div>
          
        </div>
      </div>
    </header>
  );
}
