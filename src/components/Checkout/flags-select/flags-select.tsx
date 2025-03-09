"use client";

import React, { useEffect, useRef } from "react";
import ReactFlagsSelect from "react-flags-select";

type Props = {
  disabled: boolean;
  country: string;
  className: string;
  placeholder?: string;
  selectedSize?: number;
  optionsSize?: number;
  isSearchable?: boolean;
  onChangeCountry: (country: string) => void;
};

const FlagsSelect = ({
  disabled,
  country,
  onChangeCountry,
  className,
  placeholder = "-",
  optionsSize = 16,
  selectedSize = 16,
  isSearchable = true,
}: Props) => {
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectRef.current) {
      const inputs = selectRef.current.querySelectorAll("input, button");
      inputs.forEach((input) => {
        (input as HTMLElement).tabIndex = -1;
      });
    }
  }, [country, disabled]);

  return (
    <div ref={selectRef}>
      <ReactFlagsSelect
        disabled={disabled}
        selected={country}
        onSelect={onChangeCountry}
        showSelectedLabel={false}
        fullWidth={false}
        className={className}
        selectedSize={selectedSize}
        optionsSize={optionsSize}
        placeholder={placeholder}
        searchable={isSearchable}
      />
    </div>
  );
};

export default FlagsSelect;
