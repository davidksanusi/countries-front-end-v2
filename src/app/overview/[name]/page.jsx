import Feedback from "@/components/HomaPage/feedback";
import Navbar from "@/components/HomaPage/Navbar";
import { Categories } from "@/components/Overview/Categories";
import OverviewFooter from "@/components/Overview/footer";
import { OverviewTabs } from "@/components/Overview/OverviewTabs";
import Image from "next/image";
import Link from "next/link";
import "../../globals.css";

export async function generateStaticParams() {
  const response = await fetch(
    "https://countries-backend-y8w2.onrender.com/api/get_country_slugs"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data.data.map((item) => ({
    name: item,
  }));
}

export const dynamic = "force-static";

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
    throw new Error("Failed to fetch data");
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

const Overview = async ({ params }) => {
  const { name } = params;

  console.log(params);

  const [countryData, randomNamesData] = await Promise.all([
    fetchCountryData(name),
    fetchRandomNames(),
  ]);

  return (
    <>
      <Navbar />
      <div className="px-4 md:px-6 lg:px-24 xl:px-40 py-6 flex flex-col">
        <p className="font-black leading-normal text-[#0D121C] text-4xl py-4">
          {countryData.name}
        </p>

        <OverviewTabs content_pages={countryData?.content_pages} />

        {/* Maps section Code */}

        {/* <div className="mt-4 flex gap-5 my-4">
    {(loading || loading == null) ? (
          <Skeleton active paragraph={{ rows: 3 }} />
        ) : <div className="mt-4 flex gap-5">
        {countryData?.maps.map((mapUrl, index) => (
          <div key={index} className="mt-4 flex gap-5">
            <iframe
              title={`Map ${index + 1}`}
              src={mapUrl}
              width="176"
              height="99"
             
            />
          </div>
        ))}
      </div>}
      </div> */}

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
                    {item.question}
                  </p>

                  <p className="text-[#61788A] text-sm font-normal leading-normal">
                    {item.answer}
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
        <OverviewFooter />
      </div>
    </>
  );
};

export default Overview;
