"use client";

import { Skeleton } from "antd";
import { useEffect, useRef, useState } from "react";
import { FilterComponent } from "../filters";
import CountryCard from "./countryCard";

const Main = ({ countriesData }) => {
  const [continents, setContinent] = useState(
    countriesData?.data?.query_params?.filter_params?.continents || ""
  );
  const [languages, setLanguage] = useState(
    countriesData?.data?.query_params?.filter_params?.languages || ""
  );
  const [currency, setCurrency] = useState(
    countriesData?.data?.query_params?.filter_params?.currency || ""
  );
  const [borders, setBorder] = useState(
    countriesData?.data?.query_params?.filter_params?.borders || ""
  );
  const [independent, setIndependent] = useState(
    countriesData?.data?.query_params?.filter_params?.independent || null
  );
  const [UN_member, setUNMember] = useState(
    countriesData?.data?.query_params?.filter_params?.UN_member || null
  );
  const [landlocked, setLandlocked] = useState(
    countriesData?.data?.query_params?.filter_params?.landlocked || null
  );
  const [sort_category, setSortCategory] = useState(
    countriesData?.data?.query_params?.sort_params?.sort_category || ""
  );
  const [sort_order, setSortOrder] = useState(
    countriesData?.data?.query_params?.sort_params?.sort_order || ""
  );
  const [countries, setCountries] = useState(countriesData || []);
  const [loading, setLoading] = useState(false);

  const firstRender = useRef(true);

  useEffect(() => {
    const fetchCountries = async () => {
      console.log("fetching countries");

      try {
        setLoading(true);

        let requestBody = {};

        // Prepare the request body with filters
        requestBody = {
          filter_params: {
            continents,
            languages,
            currency,
            borders,
            independent,
            UN_member,
            landlocked,
          },
          sort_params: {
            sort_category,
            sort_order,
          },
        };

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
        console.log(data);
        setCountries(data);
        setLoading(false);

        const newPath = `/${data.data.title.seo_slug}`;
        window.history.replaceState(null, "", newPath);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

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
    setContinent("");
    setLanguage("");
    setCurrency("");
    setBorder("");
    setIndependent(null);
    setUNMember(null);
    setLandlocked(null);
    setSortCategory("");
    setSortOrder("");
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
            continents={continents}
            languages={languages}
            currency={currency}
            borders={borders}
            independent={independent}
            UN_member={UN_member}
            landlocked={landlocked}
            sort_category={sort_category}
            sort_order={sort_order}
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
