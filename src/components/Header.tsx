"use client";

import { usePathname } from "next/navigation";
import Search from "./Search";
import { BellIcon, CoffeeIcon, GithubIcon } from "@/lib/icons";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="">
      <div className="container px-4 mx-auto flex justify-between items-center text-sm md:font-bold">
        <Link
          href="/"
          className="uppercase tracking-[4px] font-medium px-4 md:px-6 py-3 bg-lightbrigtgreen text-midnight"
        >
          Bigtime
        </Link>

        <div className="flex items-center gap-4">
          {/* SEARCH */}
          {pathname.includes("/clock") && <Search />}

          <div className="flex items-center gap-4">
            {/* <button className="cursor-pointer">{<BellIcon />}</button> */}
            <a href="https://github.com/pk504b/bigtime" target="_blank">{<GithubIcon />}</a>
            <a href="https://ko-fi.com/pk504b" target="_blank">{<CoffeeIcon />}</a>
          </div>
        </div>
      </div>
    </header>
  );
}
