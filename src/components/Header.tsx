"use client";

import { usePathname } from "next/navigation";
import Search from "./Search";
import { BellIcon, CoffeeIcon } from "@/lib/icons";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="">
      <div className="container px-4 mx-auto flex justify-between items-center text-sm md:font-bold">
        <a
          href="/"
          className="uppercase tracking-[4px] font-medium px-4 md:px-6 py-3 bg-lightbrigtgreen text-midnight"
        >
          Bigtime
        </a>

        <div className="flex items-center gap-4">
          {/* SEARCH */}
          {pathname.includes("/clock") && <Search />}

          <div className="flex items-center gap-4">
            <button className="cursor-pointer">{<BellIcon />}</button>
            <button className="cursor-pointer">{<CoffeeIcon />}</button>
          </div>
        </div>
      </div>
    </header>
  );
}
