import HomaPage from "@/components/HomaPage";
import { redirect } from "next/navigation";

async function getCountries(slug) {
  const response = await fetch(
    "https://countries-backend-y8w2.onrender.com/api/filter_names",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({slug: slug}),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default async function Home({ params }) {
  const { slug } = params;

  if (!slug) {
    redirect("/countries");
  }

  const data = await getCountries(slug);

  return <HomaPage countries={data}/>;
}
