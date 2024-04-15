import preval from "next-plugin-preval";
import { getAllCountries } from "./lib/data";

async function getData() {
  return await getAllCountries();
}

export default preval(getData());
