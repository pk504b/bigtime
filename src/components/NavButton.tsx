"use client";

import { usePathname } from "next/navigation";

type Props = {
  href: string;
  name: string;
  icon: React.ReactNode;
};

export default function NavButton({ href, name, icon }: Props) {
  const pathname = usePathname();

  return (
    <a
      href={href}
      className={`flex-grow flex flex-col items-center gap-1 py-2 rounded-md text-hintofyellow ${
        pathname.includes(href) ? "bg-lightbrigtgreen text-midnight" : ""
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm">{name}</span>
    </a>
  );
}
