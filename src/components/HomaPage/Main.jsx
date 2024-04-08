"use client";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CountryCard from "./countryCard";
import { FilterComponent } from "../filters";

const Main = () => {
  const [continents, setContinent] = useState("");
  const [languages, setLanguage] = useState("");
  const [currency, setCurrency] = useState("");
  const [borders, setBorder] = useState("");
  const [independent, setIndependent] = useState(null);
  const [UN_member, setUNMember] = useState(null);
  const [landlocked, setLandlocked] = useState(null);
  const [sort_category, setSortCategory] = useState("");
  const [sort_order, setSortOrder] = useState("");

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [serverFilters, setServerFilters] = useState({
    continents: "",
    languages: "",
    currency: "",
    borders: "",
    independent: null,
    UN_member: null,
    landlocked: null,
    sort_category: "",
    sort_order: "",
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [dynamicSlug, setDynamicSlug] = useState(
    pathname.slice(1, pathname.length)
  );

  const slug = searchParams?.get("slug_input");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);

        let requestBody = {};

        // Add slug_input to request body if it's present in the URL
        if (slug) {
          requestBody.slug = slug;
        } else {
          // Prepare the request body with filters
          requestBody =
            dynamicSlug.length > 0
              ? { slug: dynamicSlug }
              : {
                  filter_params: {
                    continents: continents || serverFilters.continents,
                    languages: languages || serverFilters.languages,
                    currency: currency || serverFilters.currency,
                    borders: borders || serverFilters.borders,
                    independent: independent || serverFilters.independent,
                    UN_member: UN_member || serverFilters.UN_member,
                    landlocked: landlocked || serverFilters.landlocked,
                  },
                  sort_params: {
                    sort_category: sort_category || serverFilters.sort_category,
                    sort_order: sort_order || serverFilters.sort_order,
                  },
                };
        }

        // Remove null or undefined values from the request body
        requestBody = Object.fromEntries(
          Object.entries(requestBody).filter(([_, value]) => value != null)
        );

        const response = await fetch(
          "https://countries-backend-y8w2.onrender.com/api/filter_names",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (!response.ok) {
          setLoading(false);
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        const filters = data.data.query_params.filter_params;
        const sorting = data.data.query_params.sort_params;

        setServerFilters({
          continents: filters.continents ?? "",
          landlocked: filters.landlocked ?? null,
          languages: filters.languages ?? "",
          currency: filters.currency ?? "",
          borders: filters.borders ?? "",
          independent: filters.independent ?? null,
          UN_member: filters.UN_member ?? null,
          sort_category: sorting.sort_category ?? "",
          sort_order: sorting.sort_order ?? "",
        });

        if (data.data.title.seo_slug !== dynamicSlug) {
          console.log("slug", data.data.title.seo_slug);
          console.log("dynamicSlug", dynamicSlug);
          router.push("/" + data.data.title.seo_slug);
          return;
        }

        setDynamicSlug("");

        setCountries(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchCountries();
  }, [
    continents,
    languages,
    landlocked,
    currency,
    borders,
    independent,
    UN_member,
    sort_category,
    sort_order,
  ]);

  // Function to handle filter change
  const handleSelectValue = (filter, value) => {
    switch (filter) {
      case "continents":
        setContinent(value);
        break;
      case "languages":
        setLanguage(value);
        break;
      case "currency":
        setCurrency(value);
        break;
      case "borders":
        setBorder(value);
        break;
      case "independent":
        setIndependent(value == "Yes" ? 1 : value == null ? null : 0);
        break;
      case "UN_member":
        setUNMember(value == "Yes" ? 1 : value == null ? null : 0);
        break;
      case "landlocked":
        setLandlocked(value == "Yes" ? 1 : value == null ? null : 0);
        break;
      case "sort_category":
        setSortCategory(value);
        break;
      case "sort_order":
        setSortOrder(value);
        break;
      default:
        break;
    }
  };

  // Function to clear all filters
  const clearFilter = () => {
    // setContinent("");
    // setLanguage("");
    // setCurrency("");
    // setBorder("");
    // setIndependent(null);
    // setUNMember(null);
    // setLandlocked(null);
    // setSortCategory("");
    // setSortOrder("");
    router.push("/countries");
  };
  const dummyBabies = new Array(20).fill(null); // Create an array with 8 null elements for dummy cards

  return (
    <>
      <div className="flex flex-col gap-12 justify-start items-start py-6 px-4 bg-white">
        <div className="flex flex-col justify-start items-start gap-6">
          {/* Heading */}
          {loading ? (
            <>
              {" "}
              <span className="h-[40px] w-full px-4 md:px-6 lg:px-16 xl:px-6">
                <Skeleton
                  active
                  title={{ width: "25%" }}
                  paragraph={{ rows: 1 }}
                />
              </span>
            </>
          ) : (
            <p className="text-[#0D121C] text-3xl font-bold leading-normal px-4 md:px-6 lg:px-24 xl:px-6">
              {countries?.data?.title?.seo_title}{" "}
            </p>
          )}

          {/* Select fields */}
          <FilterComponent
            handleSelectValue={handleSelectValue}
            continents={continents || serverFilters.continents}
            languages={languages || serverFilters.languages}
            currency={currency || serverFilters.currency}
            borders={borders || serverFilters.borders}
            independent={independent || serverFilters.independent}
            UN_member={UN_member || serverFilters.UN_member}
            landlocked={landlocked || serverFilters.landlocked}
            sort_category={sort_category || serverFilters.sort_category}
            sort_order={sort_order || serverFilters.sort_order}
            clearFilter={clearFilter}
          />
        </div>
        <div className="px-2 md:px-2 lg:px-2 xl:px-2 grid grid-cols-5 mx-auto gap-5">
          {loading ? (
            dummyBabies.map((_, index) => (
              <CountryCard key={index} loading={loading} />
            ))
          ) : countries?.data?.countries?.length > 0 ? (
            countries?.data?.countries?.map((country, index) => (
              <CountryCard key={index} country={country} loading={loading} />
            ))
          ) : (
            <div className="text-3xl font-bold text-center w-[70vw] mt-8">
              No Data Found
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
