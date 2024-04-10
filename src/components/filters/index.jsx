import { useState } from 'react';
import { Select, Button } from 'antd';
import { CloseCircleOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

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
  clearFilter
}) => {
  // Dummy options for select dropdowns
  const continentOptions = [
    { label: 'Asia', value: 'Asia' },
    { label: 'Africa', value: 'Africa' },
    { label: 'Europe', value: 'Europe' },
    { label: 'North America', value: 'North America' },
    { label: 'South America', value: 'South America' },
    { label: 'Oceania', value: 'Oceania' }
  ];
  const languageOptions = [
    { label: 'English', value: 'English' },
    { label: 'Spanish', value: 'Spanish' },
    { label: 'French', value: 'French' },
    { label: 'Chinese', value: 'Chinese' },
    { label: 'Hindi', value: 'Hindi' },
    { label: 'Arabic', value: 'Arabic' }
  ];
  const currencyOptions = [
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'GBP', value: 'GBP' },
    { label: 'JPY', value: 'JPY' },
    { label: 'CNY', value: 'CNY' },
    { label: 'INR', value: 'INR' }
  ];
  const borderOptions = [
    { label: 'CHN', value: 'CHN' },
    { label: 'USA', value: 'USA' },
    { label: 'IND', value: 'IND' },
    { label: 'CAN', value: 'CAN' },
    { label: 'MEX', value: 'MEX' },
    { label: 'RUS', value: 'RUS' }
  ];
  const booleanOptions = [
    { label: 'Yes', value: "Yes" },
    { label: 'No', value: "No" }
  ];
  const sortCategoryOptions = [
    { label: 'GDP per capita', value: 'gdp_per_capita' },
    { label: 'Population', value: 'population' },
    { label: 'Area', value: 'area' }
  ];
  const sortOrderOptions = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' }
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 w-[95vw]">
      <div className="text-base font-medium items-center gap-2 flex bg-[#e8edf5] p-2 rounded-[8px]">
        Continent :
        <Select
          className="min-w-[130px] bg-[#e5e5e5] rounded-xl"
          onChange={(e) => handleSelectValue("continents", e)}
          variant="filled"
          style={{ flex: 1 }}
          options={continentOptions}
          value={continents}
        />
        {continents && (
          <CloseCircleOutlined
            className="bg-[#e8edf5] p-2 rounded-xl text-[#FF0000] cursor-pointer"
            onClick={() => handleSelectValue('continents', '')} // Clear individual filter
          />
        )}
      </div>

      <div className="text-base font-medium items-center gap-2 flex bg-[#e8edf5] p-2 rounded-[8px]">
        Language:
        <Select
          className="min-w-[100px] bg-[#e5e5e5] rounded-xl"
          onChange={(e) => handleSelectValue("languages", e)}
          variant="filled"
          style={{ flex: 1 }}
          options={languageOptions}
          value={languages}
        />
        {languages && (
          <CloseCircleOutlined
            className="bg-[#e8edf5] p-2 rounded-xl text-[#FF0000] cursor-pointer"
            onClick={() => handleSelectValue('languages', '')} // Clear individual filter
          />
        )}
      </div>

      <div className="text-base font-medium items-center gap-2 flex bg-[#e8edf5] p-2 rounded-[8px]">
        Currency :
        <Select
          className="min-w-[80px] bg-[#e5e5e5] rounded-xl"
          onChange={(e) => handleSelectValue("currency", e)}
          variant="filled"
          style={{ flex: 1 }}
          options={currencyOptions}
          value={currency}
        />
        {currency && (
          <CloseCircleOutlined
            className="bg-[#e8edf5] p-2 rounded-xl text-[#FF0000] cursor-pointer"
            onClick={() => handleSelectValue('currency', '')} // Clear individual filter
          />
        )}
      </div>

      <div className="text-base font-medium items-center gap-2 flex bg-[#e8edf5] p-2 rounded-[8px]">
        Border :
        <Select
          className="min-w-[80px] bg-[#e5e5e5] rounded-xl"
          onChange={(e) => handleSelectValue("borders", e)}
          variant="filled"
          style={{ flex: 1 }}
          options={borderOptions}
          value={borders}
        />
        {borders && (
          <CloseCircleOutlined
            className="bg-[#e8edf5] p-2 rounded-xl text-[#FF0000] cursor-pointer"
            onClick={() => handleSelectValue('borders', '')} // Clear individual filter
          />
        )}
      </div>

      <div className="text-base font-medium items-center gap-2 flex bg-[#e8edf5] p-2 rounded-[8px]">
        Independent :
        <Select
          className="min-w-[70px] bg-[#e5e5e5] rounded-xl"
          onChange={(e) => handleSelectValue("independent", e)}
          variant="filled"
          style={{ flex: 1 }}
          options={booleanOptions}
          value={independent ==  1 ? 'Yes' :independent == null ? '' : 'No' }

        />
        {independent != null&& (
          <CloseCircleOutlined
            className="bg-[#e8edf5] p-2 rounded-xl text-[#FF0000] cursor-pointer"
            onClick={() => handleSelectValue('independent', null)} // Clear individual filter
          />
        )}
      </div>

      <div className="text-base font-medium items-center gap-2 flex bg-[#e8edf5] p-2 rounded-[8px]">
        UN Member :
        <Select
          className="min-w-[70px] bg-[#e5e5e5] rounded-xl"
          onChange={(e) => handleSelectValue("UN_member", e)}
          variant="filled"
          style={{ flex: 1 }}
          options={booleanOptions}
          value={UN_member ==  1 ? 'Yes' :UN_member == null ? '' : 'No' }

        />
        {UN_member != null&& (
          <CloseCircleOutlined
            className="bg-[#e8edf5] p-2 rounded-xl text-[#FF0000] cursor-pointer"
            onClick={() => handleSelectValue('UN_member', null)} // Clear individual filter
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
        value={landlocked ==  1 ? 'Yes' :landlocked == null ? '' : 'No' }
    />
    {landlocked != null && ( // Check if landlocked is not null
        <CloseCircleOutlined
            className="bg-[#e8edf5] p-2 rounded-xl text-[#FF0000] cursor-pointer"
            onClick={() => handleSelectValue('landlocked', null)} // Clear individual filter
        />
    )}
</div>
<div className="text-base font-medium items-center gap-2 flex bg-[#e8edf5] p-2 rounded-[8px]">
    Sort by:
    <Select
        className="min-w-[120px] bg-[#e5e5e5] rounded-xl"
        onChange={(value) => handleSelectValue('sort_category',value)}
        options={sortCategoryOptions}
        variant="filled"

        value={sort_category}
    />
    <Select
        className="min-w-[120px] bg-[#e5e5e5] rounded-xl"
        onChange={(value) => handleSelectValue('sort_order',value)}
        options={sortOrderOptions}
        value={sort_order}
        variant="filled"

    />
    {(sort_category || sort_order ) && (
        <CloseCircleOutlined
            className="bg-[#e8edf5] p-2 rounded-xl text-[#FF0000] cursor-pointer"
            onClick={() => {handleSelectValue('sort_order','');
            handleSelectValue('sort_category','')}}
        />
    )}


</div>
{(continents|| languages|| landlocked|| UN_member|| currency|| sort_category||sort_category || borders) && (
              <Button type="primary" onClick={clearFilter}>Clear All Filters</Button> // Button to clear all filters
            )}
        </div>
  )}