import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import "../../app/globals.css";
import { AutocompleteSearch } from "./auto-complete";
import { MobileNav } from "./mobile-nav";

async function getCountries() {
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

const Navbar = async () => {
  const countries = await getCountries();

  return (
    <>
      <div className="flex justify-between items-center gap-6 px-4 md:px-6 lg:px-10 py-5 bg-white border-b border-[#E5E8EB]">
        {/* Logo and Menus */}
        <div className="flex gap-8 justify-center items-center">
          <Link href="/">
            <Image
              alt=""
              src={"/logo.svg"}
              className="cursor-pointer"
              height={24}
              width={140}
            />
          </Link>
          <div className="hidden lg:flex gap-8 justify-center items-center">
            <a className="text-[#0D121C] text-sm leading-normal">Home</a>
            <a className="text-[#0D121C] text-sm leading-normal">Featured</a>
            <a className="text-[#0D121C] text-sm leading-normal">Recent</a>
          </div>
        </div>
        <div className="hidden lg:flex justify-center items-center gap-8">
          <AutocompleteSearch countries={countries} />

          <div className="flex gap-2 justify-center itemes-center">
            <Button className="hover:bg-[#1C6EF2] bg-[#1C6EF2] rounded-lg hover:text-white text-white text-sm leading-normal font-medium hover:border-none border-none py-3 px-5 hover:outline-none outline-none h-10 flex justify-center items-center">
              Log in
            </Button>
            <Button className="hover:bg-[#E8EDF5] bg-[#E8EDF5] rounded-lg hover:text-[#0D121C] text-[#0D121C] text-sm leading-normal font-medium hover:border-none border-none py-3 px-5 hover:outline-none outline-none h-10 flex justify-center items-center">
              Sign up
            </Button>
          </div>
        </div>

        <MobileNav />
      </div>
    </>
  );
};

export default Navbar;
