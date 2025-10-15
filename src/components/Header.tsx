"use client";

import { usePathname } from "next/navigation";
import Search from "./Search";
import { BellIcon, CoffeeIcon } from "@/lib/icons";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="">
      <div className="container mx-auto flex justify-between items-center text-sm md:font-bold">
        <a
          href="/"
          className="uppercase tracking-[4px] font-normal px-4 md:px-6 py-2 bg-lightbrigtgreen dark:text-dbg flex items-center"
        >
          Bigtime
        </a>

        <div className="flex items-center gap-2">
          {/* SEARCH */}
          {pathname.includes("/clock") && <Search />}

          <div className="flex items-center gap-2">
            <button className="cursor-pointer">{<BellIcon />}</button>
            <button className="cursor-pointer">{<CoffeeIcon />}</button>
          </div>
        </div>
      </div>
    </header>
  );
}
