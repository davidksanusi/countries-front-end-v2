"use client";

import { useDebounce } from "@/lib/hooks/useDebounce";
import { AutoComplete } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const AutocompleteSearch = () => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");

  const debouncedValue = useDebounce(value, 500);

  const router = useRouter();

  const onSelect = (value) => {
    router.push(`/country/${value}/overview`);
  };

  const searchResult = async (query) => {
    const response = await fetch(
      "https://countries-backend-y8w2.onrender.com/api/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    console.log("Fetched search result for", query, data);

    const result = data.slice(0, 10).map((country) => {
      return {
        value: country.code,
        label: (
          <div className="flex items-center">
            <img src={country.flag_svg} alt={country.name} className="w-4" />
            <span className="ml-2">{country.name}</span>
          </div>
        ),
      };
    });

    return result;
  };

  useEffect(() => {
    if (debouncedValue) {
      searchResult(debouncedValue).then((result) => setOptions(result));
    } else {
      setOptions([]);
    }
  }, [debouncedValue]);

  return (
    <AutoComplete
      value={value}
      onChange={(value) => setValue(value)}
      options={options}
      style={{ width: 300 }}
      onSelect={onSelect}
      onSearch={() => {}}
      placeholder="Search countries..."
    />
  );
};
