import HomaPage from "@/components/HomaPage";
import { unstable_cache } from "next/cache";

export async function generateStaticParams() {
  const response = await fetch(
    "https://countries-backend-y8w2.onrender.com/api/get_single_filter_slugs"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  const staticParams = data.data.map((slug) => ({
    slug,
  }));

  return staticParams.slice(0, 5);
}

export async function getFilters() {
  const response = await fetch(
    "https://countries-backend-y8w2.onrender.com/api/get_filters",
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch filters data");
  }

  return response.json();
}

const cacheFilters = unstable_cache(getFilters);

async function getCountries(slug) {
  const response = await fetch(
    "https://countries-backend-y8w2.onrender.com/api/filter_names",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug: slug }),
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export const dynamic = "force-static";
export const dynamicParams = true;

export default async function Home({ params }) {
  const { slug } = params;
  const [countries, filters] = await Promise.all([
    getCountries(slug),
    cacheFilters(),
  ]);

  return <HomaPage countries={countries} filters={filters}/>;
}
