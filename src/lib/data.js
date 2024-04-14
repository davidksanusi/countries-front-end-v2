import { unstable_cache as cache } from "next/cache";
import seedrandom from "seedrandom";

export async function getCountryData(name) {
  console.log("Fetching data for country", name);

  const response = await fetch(
    "https://countries-backend-y8w2.onrender.com/api/post_country",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: name }),
    }
  );

  if (!response.ok) {
    console.log("Failed to fetch data for country", name);
    return null;
  }

  const data = await response.json();
  return data.data;
}

export const getCachedCountryData = (name) =>
  cache(async () => await getCountryData(name), [`country-${name}`])(name);

async function getAllCountries() {
  console.log("Fetching all countries");

  const response = await fetch(
    "https://countries-backend-y8w2.onrender.com/api/search",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: "" }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export const getCachedAllCountries = cache(
  async () => await getAllCountries(),
  ["all-countries"]
);

export async function getRandomCountries(count, seed) {
  const countries = await getCachedAllCountries();

  const rng = seedrandom(seed);

  const selectedCountries = [];
  const selectedIndexes = new Set();

  while (selectedCountries.length < count) {
    const index = Math.floor(rng() * countries.length);

    if (selectedIndexes.has(index)) {
      continue;
    }

    selectedIndexes.add(index);
    selectedCountries.push(countries[index]);
  }

  return selectedCountries;
}

async function getFilters() {
  console.log("Fetching filters data");

  const response = await fetch(
    "https://countries-backend-y8w2.onrender.com/api/get_filters",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch filters data");
  }

  return response.json();
}

export const getCachedFilters = cache(
  async () => await getFilters(),
  ["filters"]
);

async function getCountries(slug) {
  console.log("Fetching filtered countries for slug:", slug);

  const response = await fetch(
    "https://countries-backend-y8w2.onrender.com/api/filter_names",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug: slug }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export const getCachedFilteredCountries = cache(
  async (slug) => await getCountries(slug),
  ["filtered-countries"]
);
