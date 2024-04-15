import preval from "next-plugin-preval";
import { getAllCountries, getCountryData } from "./lib/data";

async function getData() {
  const countries = await getAllCountries();

  var countriesData = {};
  for (const country of countries) {
    try {
      const data = await getCountryData(country.code);
      countriesData[country.code] = data;
    } catch (e) {
      console.error(`Failed to fetch data for country ${country.code}`);
      countriesData[country.code] = null;
    }
  }

  return countriesData;
}

export default preval(getData());
