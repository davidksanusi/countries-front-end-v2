"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export function SectionNav({ sections }) {
  const { name, section } = useParams();

  const routes = useMemo(() => {
    return sections?.map((s) => ({
      ...s,
      href: `/country/${name}/${s.slug}`,
      isActive: s.slug === section,
    }));
  }, [section, name]);

  return (
    <nav className="flex gap-4 items-center w-full border-b">
      {routes?.map((route, index) => (
        <Link
          key={index}
          href={route.href}
          className={cn(
            `text-sm px-2 pb-3 transition-colors duration-200 ease-in-out  ${
              route.isActive
                ? "text-[#4A699C] font-bold border-[#4A699C] border-b-2"
                : "text-black"
            }`
          )}
        >
          {route.title}
        </Link>
      ))}
    </nav>
  );
}
