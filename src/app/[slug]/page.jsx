import HomaPage from "@/components/HomaPage";
import { unstable_cache as cache } from "next/cache";
import { redirect } from "next/navigation";

export async function generateStaticParams() {

  const routes = [
    "countries",
    "north-american-countries",
    "french-speaking-countries",
  ];

  return routes.map((slug) => ({
    slug,
  }));
}

export const dynamic = 'force-static';
export const dynamicParams = true;


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

export default async function Home({ params }) {
  const { slug } = params;
  const data = await getCountries(slug);

  return <HomaPage countries={data} />;
}
