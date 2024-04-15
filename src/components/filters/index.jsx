"use client";

import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";

// Filter component
export const FilterComponent = ({
  handleSelectValue,
  continents,
  languages,
  currency,
  borders,
  independent,
  UN_member,
  landlocked,
  sort_category,
  sort_order,
  clearFilter,
  initialFiltersData,
}) => {
  const data = initialFiltersData?.data;

  const continentOptions = data?.filter_options
    ?.find((item) => item.filter_key === "continents")
    ?.filter_params.map((param) => ({
      label: param.param_value,
      value: param.param_key,
    }));

  const languageOptions = data?.filter_options
    ?.find((item) => item.filter_key === "languages")
    ?.filter_params.map((param) => ({
      label: param.param_value,
      value: param.param_key,
    }));

  const currencyOptions = data?.filter_options
    ?.find((item) => item.filter_key === "currency")
    ?.filter_params.map((param) => ({
      label: param.param_value,
      value: param.param_key,
    }));

  const borderOptions = data?.filter_options
    ?.find((item) => item.filter_key === "borders")
    ?.filter_params.map((param) => ({
      label: param.param_value,
      value: param.param_key,
    }));

  const booleanOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const sortCategoryOptions = data?.sort_options?.map((param) => ({
    label: param.sort_title,
    value: param.sort_key,
  }));

  const sortOrderOptions = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 w-[95vw]">
      <div className="text-base font-medium items-center gap-2 flex bg-[#e8edf5] p-2 rounded-[8px]">
        Continent :
        <Select
          className="min-w-[130px] bg-[#e5e5e5] rounded-xl"
          showSearch
          onChange={(e) => handleSelectValue("continents", e)}
          variant="filled"
          style={{ flex: 1, minWidth: "130px" }}
          options={continentOptions}
          value={continents}
        />
        {continents && (
          <CloseCircleOutlined
            className="bg-[#e8edf5] p-2 rounded-xl text-[#FF0000] cursor-pointer"
            onClick={() => handleSelectValue("continents", "")} // Clear individual filter
          />
        )}
      </div>

      <div className="text-base font-medium items-center gap-2 flex bg-[#e8edf5] p-2 rounded-[8px]">
        Language:
        <Select
          className="min-w-[100px] bg-[#e5e5e5] rounded-xl"
          showSearch
          onChange={(e) => handleSelectValue("languages", e)}
          variant="filled"
          style={{ flex: 1, width: "150px" }}
          options={languageOptions}
          value={languages}
        />
        {languages && (
          <CloseCircleOutlined
            className="bg-[#e8edf5] p-2 rounded-xl text-[#FF0000] cursor-pointer"
            onClick={() => handleSelectValue("languages", "")} // Clear individual filter
          />
        )}
      </div>

      <div className="text-base font-medium items-center gap-2 flex bg-[#e8edf5] p-2 rounded-[8px]">
        Currency :
        <Select
          className="min-w-[80px] bg-[#e5e5e5] rounded-xl"
          showSearch
          onChange={(e) => handleSelectValue("currency", e)}
          variant="filled"
          style={{ flex: 1, width: "220px" }}
          options={currencyOptions}
          value={currency}
        />
        {currency && (
          <CloseCircleOutlined
            className="bg-[#e8edf5] p-2 rounded-xl text-[#FF0000] cursor-pointer"
            onClick={() => handleSelectValue("currency", "")} // Clear individual filter
          />
        )}
      </div>

      <div className="text-base font-medium items-center gap-2 flex bg-[#e8edf5] p-2 rounded-[8px]">
        Border :
        <Select
          className="min-w-[80px] bg-[#e5e5e5] rounded-xl"
          showSearch
          onChange={(e) => handleSelectValue("borders", e)}
          variant="filled"
          style={{ flex: 1, width: "150px" }}
          options={borderOptions}
          value={borders}
        />
        {borders && (
          <CloseCircleOutlined
            className="bg-[#e8edf5] p-2 rounded-xl text-[#FF0000] cursor-pointer"
            onClick={() => handleSelectValue("borders", "")} // Clear individual filter
          />
        )}
      </div>

      <div className="text-base font-medium items-center gap-2 flex bg-[#e8edf5] p-2 rounded-[8px]">
        Independent :
        <Select
          className="min-w-[70px] bg-[#e5e5e5] rounded-xl"
          showSearch
          onChange={(e) => handleSelectValue("independent", e)}
          variant="filled"
          style={{ flex: 1 }}
          options={booleanOptions}
          value={independent == 1 ? "Yes" : independent == null ? "" : "No"}
        />
        {independent != null && (
          <CloseCircleOutlined
            className="bg-[#e8edf5] p-2 rounded-xl text-[#FF0000] cursor-pointer"
            onClick={() => handleSelectValue("independent", null)} // Clear individual filter
          />
        )}
      </div>

      <div className="text-base font-medium items-center gap-2 flex bg-[#e8edf5] p-2 rounded-[8px]">
        UN Member :
        <Select
          className="min-w-[70px] bg-[#e5e5e5] rounded-xl"
          showSearch
          onChange={(e) => handleSelectValue("UN_member", e)}
          variant="filled"
          style={{ flex: 1 }}
          options={booleanOptions}
          value={UN_member == 1 ? "Yes" : UN_member == null ? "" : "No"}
        />
        {UN_member != null && (
          <CloseCircleOutlined
            className="bg-[#e8edf5] p-2 rounded-xl text-[#FF0000] cursor-pointer"
            onClick={() => handleSelectValue("UN_member", null)} // Clear individual filter
          />
        )}
      </div>

      <div className="text-base font-medium items-center gap-2 flex bg-[#e8edf5] p-2 rounded-[8px]">
        Landlocked :
        <Select
          className="min-w-[70px] bg-[#e5e5e5] rounded-xl"
          onChange={(e) => handleSelectValue("landlocked", e)}
          variant="filled"
          style={{ flex: 1 }}
          options={booleanOptions}
          value={landlocked == 1 ? "Yes" : landlocked == null ? "" : "No"}
        />
        {landlocked != null && ( // Check if landlocked is not null
          <CloseCircleOutlined
            className="bg-[#e8edf5] p-2 rounded-xl text-[#FF0000] cursor-pointer"
            onClick={() => handleSelectValue("landlocked", null)} // Clear individual filter
          />
        )}
      </div>
      <div className="text-base font-medium items-center gap-2 flex bg-[#e8edf5] p-2 rounded-[8px]">
        Sort by:
        <Select
          showSearch
          className="min-w-[200px] bg-[#e5e5e5] rounded-xl"
          onChange={(value) => handleSelectValue("sort_category", value)}
          options={sortCategoryOptions}
          variant="filled"
          value={sort_category}
        />
        <Select
          className="min-w-[120px] bg-[#e5e5e5] rounded-xl"
          onChange={(value) => handleSelectValue("sort_order", value)}
          options={sortOrderOptions}
          value={sort_order}
          variant="filled"
        />
        {(sort_category || sort_order) && (
          <CloseCircleOutlined
            className="bg-[#e8edf5] p-2 rounded-xl text-[#FF0000] cursor-pointer"
            onClick={() => {
              handleSelectValue("sort_order", "");
              handleSelectValue("sort_category", "");
            }}
          />
        )}
      </div>
      {(continents ||
        languages ||
        landlocked ||
        UN_member ||
        currency ||
        sort_category ||
        sort_category ||
        borders) && (
        <Button type="primary" onClick={clearFilter}>
          Clear All Filters
        </Button> // Button to clear all filters
      )}
    </div>
  );
};
