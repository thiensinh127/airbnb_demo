"use client";
import useCountries from "@/app/hooks/useCountry";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Select from "react-select";
import Map from "../Map";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface Props {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}
const CountrySelect: React.FC<Props> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        value={value}
        options={getAll()}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-1 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          zIndex: 999,
          colors: {
            ...theme.colors,
            primary25: "#ffe4e6",
            primary: "#ef4444",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
