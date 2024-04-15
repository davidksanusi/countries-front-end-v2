import preval from "next-plugin-preval";
import { getFilters } from "./lib/data";

async function getData() {
  return await getFilters();
}

export default preval(getData());
