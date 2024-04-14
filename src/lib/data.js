"use server";

import { unstable_cache } from "next/cache";
import seedrandom from "seedrandom";

async function getCountryData(slug) {
  console.log("Fetching data for country", slug);

  const response = await fetch(
    "https://countries-backend-y8w2.onrender.com/api/post_country",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: slug }),
    }
  );

  if (!response.ok) {
    console.log("Failed to fetch data for country", slug);
    return null;
  }

  const data = await response.json();
  return data.data;
}

export const getCachedCountryData = unstable_cache(
  async (slug) => await getCountryData(slug),
  ["country-data"]
);

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
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export const getCachedAllCountries = unstable_cache(
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

export const getCachedFilters = unstable_cache(getFilters, ["filters"]);

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

export const getCachedFilteredCountries = unstable_cache(
  async (slug) => await getCountries(slug),
  ["filtered-countries"]
);
