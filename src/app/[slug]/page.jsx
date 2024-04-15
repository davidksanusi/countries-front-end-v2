import HomaPage from "@/components/HomaPage";
import { getFilteredCountries } from "@/lib/data";

import data from "../../filters.preval";

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

  return staticParams;
}

export const dynamic = "force-static";
export const dynamicParams = true;

export default async function Home({ params }) {
  const { slug } = params;

  const countries = await getFilteredCountries(slug);
  const filters = data;

  return <HomaPage countries={countries} filters={filters} />;
}
