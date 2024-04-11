const baseURL = "https://galileo-countries-xoqh.vercel.app";

async function getFilterSlugs() {
  const response = await fetch(
    "https://countries-backend-y8w2.onrender.com/api/get_single_filter_slugs"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data.data;
}

async function getCountriesSlugs() {
  const response = await fetch(
    "https://countries-backend-y8w2.onrender.com/api/get_country_slugs"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data.data;
}

export default async function sitemap() {
  const filterSlugs = await getFilterSlugs();
  const countriesSlugs = await getCountriesSlugs();

  const filterSlugsPaths = filterSlugs.map((slug) => ({
    url: `${baseURL}/${slug}`,
    priority: 0.8,
  }));

  const countriesSlugsPaths = countriesSlugs.map((slug) => ({
    url: `${baseURL}/overview/${slug}`,
    priority: 0.8,
  }));

  const rootPath = {
    url: baseURL,
    priority: 1,
  };

  return [rootPath, ...filterSlugsPaths, ...countriesSlugsPaths];
}
