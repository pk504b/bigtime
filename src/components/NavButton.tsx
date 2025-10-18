"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  name: string;
  icon: React.ReactNode;
};

export default function NavButton({ href, name, icon }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`flex-1 flex flex-col items-center py-2 rounded-md ${
        pathname.startsWith(href)
          ? "bg-lightbrigtgreen text-midnight dark:bg-hintofyellow"
          : ""
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm">{name}</span>
    </Link>
  );
}
