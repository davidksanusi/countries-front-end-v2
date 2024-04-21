"use client";

import Link from "next/link";

export function Categories({ similar_query }) {
  console.log('similar_query',similar_query)
  return (
    <div className="flex flex-col gap-3 py-3 justify-start items-start w-full">
      <p className="text-2xl font-bold leading-normal text-[#0D121C]">
        Explore Categories
      </p>

      <div className="flex gap-2 justify-start items-center flex-wrap">
        {similar_query?.map((item, index) => (
          <Link
            key={index}
            href={`/${item?.title?.seo_slug?.replaceAll("/", "")}`}
            className="min-w-fit rounded-2xl bg-[#E8EDF5] cursor-pointer font-medium text-[#0D121C] text-sm leading-normal p-2 px-4 text-start"
          >
            {item?.title?.seo_title}
          </Link>
        ))}
      </div>
    </div>
  );
}
