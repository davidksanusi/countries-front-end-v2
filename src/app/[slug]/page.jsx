import HomaPage from "@/components/HomaPage";
import { unstable_cache as cache } from "next/cache";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  // all these pages will be generated at build time, you can add more routes
  // if other then these routes were accessed, it will be generated dynamically
  // and then it will be cached for future requests

  const routes = [
    "countries",
    "north-american-countries",
    "french-speaking-countries",
  ];

  return routes.map((slug) => ({
    slug,
  }));
}

async function getCountries(slug) {
  const response = await fetch(
    "https://countries-backend-y8w2.onrender.com/api/filter_names",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug: slug }),
      // next: {
      //   revalidate: 3600
      // },
      // cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

const cachedCountriesData = cache(
  async (slug) => getCountries(slug),
  ["countries"],
);

export default async function Home({ params }) {
  const { slug } = params;

  if (!slug) {
    redirect("/countries");
  }

  const data = await cachedCountriesData(slug);

  return <HomaPage countries={data} />;
}
