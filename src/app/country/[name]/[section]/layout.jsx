import Feedback from "@/components/HomaPage/feedback";
import Navbar from "@/components/HomaPage/Navbar";
import { Categories } from "@/components/Overview/Categories";
import OverviewFooter from "@/components/Overview/footer";
import Image from "next/image";
import Link from "next/link";
import "../../../globals.css";
import { SectionNav } from "@/components/Overview/SectionsNav";
import { slugify } from "@/lib/utils";
import Footer from "@/components/HomaPage/footer";

async function fetchCountryData(slug) {
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

async function fetchRandomNames() {
  const randomState = Math.random().toString(36).substring(7);
  const response = await fetch(
    `https://countries-backend-y8w2.onrender.com/api/get_random_countries?state=${randomState}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}

export default async function CountryPageLayout({ params, children }) {
  const { name } = params;

  const [countryData, randomNamesData] = await Promise.all([
    fetchCountryData(name),
    fetchRandomNames(),
  ]);

  const sections = countryData?.content_pages?.map((item) => ({
    title: item?.title,
    slug: slugify(item?.title),
  }));

  return (
    <>
      <Navbar />
      <div className="px-4 md:px-6 lg:px-24 xl:px-40 py-6 flex flex-col">
        <p className="font-black leading-normal text-[#0D121C] text-4xl py-4">
          {countryData?.name}
        </p>

        {/* <OverviewTabs content_pages={countryData?.content_pages} /> */}
        <SectionNav sections={sections} />

        {children}

        {/* FAQs */}
        <div className="flex flex-col gap-3 py-3 my-3 justify-start items-start w-full">
          <p className="text-2xl font-bold leading-normal text-[#0D121C]">
            {countryData?.faq?.faq_title}
          </p>
          <div className="flex flex-col justify-start items-start w-full bg-white rounded-xl">
            {countryData?.faq?.faq_body?.map((item, index) => (
              <div key={index} className="flex gap-4 items-center py-4  w-full">
                <Image alt="" src={"/question.png"} height={48} width={48} />
                <div className="flex flex-col gap-2">
                  <p className="text-[#121417] text-base font-medium leading-normal">
                    {item?.question}
                  </p>

                  <p className="text-[#61788A] text-sm font-normal leading-normal">
                    {item?.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Names */}
        <div className="flex flex-col gap-3 py-3 justify-start items-start w-full pb-16">
          <p className="text-2xl font-bold leading-normal text-[#0D121C]">
            Explore Names
          </p>
          <div className="flex gap-3 justify-start items-center overflow-x-scroll noScrollBar w-full">
            {randomNamesData?.random_countries?.map((item, index) => (
              <Link
                // onClick={() => router.push(`/overview/${item.code}`)}
                href={`/overview/${item.code}`}
                key={index}
                className=" cursor-pointer h-[99px] rounded-xl flex justify-center items-center underline p-6 text-4xl font-bold leading-normal text-white bg-gradient-to-r from-[#383838] to-[#928F8F]"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Explore Categories */}
        <Categories similar_query={countryData?.similar_query} />

        {/* Feedback */}
        <Feedback />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
