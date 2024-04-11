import HomaPage from "@/components/HomaPage";
import { redirect } from "next/navigation";


export default function Home() {
  redirect("/countries");
}
