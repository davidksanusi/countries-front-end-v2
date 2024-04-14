import { getCachedCountryData } from "@/lib/data";
import { unslugify } from "@/lib/utils";
import { Empty } from "antd";

export async function generateStaticParams() {
  const response = await fetch(
    "https://countries-backend-y8w2.onrender.com/api/get_country_slugs"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  const staticParams = [];

  const sections = [
    "overview",
    "education",
    "economy",
    "demeographics",
    "environment",
  ];

  for (const item of data.data) {
    for (const section of sections) {
      staticParams.push({
        name: item,
        section,
      });
    }
  }

  return staticParams;
}

export const dynamic = "force-static";

export default async function CountryPage({ params }) {
  const { name, section } = params;

  const data = await getCachedCountryData(name);

  const sectionData = data?.content_pages?.find(
    (item) => item.title === unslugify(section)
  );

  if (!sectionData) {
    return <Empty description="Section not found" />;
  }

  return (
    <>
      <div className="flex flex-col gap-3 py-3 justify-start items-start">
        <p className="text-2xl font-bold leading-normal text-[#0D121C]">
          {sectionData.title}
        </p>
        {sectionData?.summary ? (
          <p className="text-[#0D121C] text-base leading-normal">
            {sectionData?.summary}
          </p>
        ) : (
          <Empty description="Summary not found" />
        )}
      </div>

      <div className="flex flex-col gap-3 py-3 justify-start items-start w-full">
        <p className="text-2xl font-bold leading-normal text-[#0D121C]">
          Quick Facts
        </p>
        {
          <>
            <div className="flex flex-wrap w-full">
              {sectionData?.facts?.length > 0 ? (
                sectionData?.facts?.map((item, index) => (
                  <div
                    key={index}
                    className="flex  flex-col md:flex-row justify-between items-center w-[50%]"
                  >
                    <div className="flex flex-col gap-1 justy-start items-start py-4 border-t border-[#E5E8EB] w-full">
                      <p className="text-[#4A699C] text-sm leading-normal">
                        {item.title}
                      </p>
                      <p className="text-[#0D121C] text-sm leading-normal">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <Empty description="Facts not found" />
              )}
            </div>
          </>
        }
      </div>
    </>
  );
}
