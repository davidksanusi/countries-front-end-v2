"use client";

import { AutoComplete } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const AutocompleteSearch = ({ countries }) => {
  const [options, setOptions] = useState([]);
  const router = useRouter();

  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value) => {
    const code = countries.find((country) => country.name === value).code;
    router.push(`/overview/${code}`);
  };

  const searchResult = (query) => {
    const lowerCaseQuery = query.toLowerCase();

    const startsWithQuery = countries.filter((country) =>
      country.name.toLowerCase().startsWith(lowerCaseQuery)
    );

    const includesQuery = countries.filter(
      (country) =>
        country.name.toLowerCase().includes(lowerCaseQuery) &&
        !startsWithQuery.includes(country)
    );

    const result = [...startsWithQuery, ...includesQuery]
      .slice(0, 5)
      .map((country) => {
        return {
          value: country.name,
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

  return (
    <AutoComplete
      options={options}
      style={{ width: 300 }}
      onSelect={onSelect}
      onSearch={handleSearch}
      placeholder="Search countries..."
    />
  );
};
