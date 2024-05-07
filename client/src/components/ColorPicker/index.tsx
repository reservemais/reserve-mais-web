"use client";

import React, { useState } from "react";
import { CirclePicker, ColorResult } from "react-color";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type ColorPickerProps = {
  label: string;
  color?: string;
  onChange: (color: ColorResult) => void;
};

const ColorPicker = ({
  label,
  color = "#039be5",
  onChange,
}: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleColorPicker = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex items-center justify-between m-1">
        <label className="block text-sm font-medium text-left text-gray-700">
          {label}
        </label>
        <div
          className="flex items-center justify-between w-auto h-8 p-2 mt-1 mb-1 bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={toggleColorPicker}
        >
          <div className="w-6 h-6 rounded-full" style={{ background: color }} />
          <ChevronDownIcon className="w-4 h-4 ml-2" />
        </div>
      </div>
      {isOpen && (
        <div className="flex items-center justify-center py-2 bg-gray-100">
          <CirclePicker
            colors={[
              "#d50000",
              "#e67c73",
              "#f4511e",
              "#f6bf26",
              "#33b679",
              "#0b8043",
              "#039be5",
              "#3f51b5",
              "#7986cb",
              "#8e24aa",
              "#43270f",
              "#616161",
            ]}
            color={color}
            onChange={onChange}
          />
        </div>
      )}
    </>
  );
};

export default ColorPicker;
