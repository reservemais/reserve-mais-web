import { InputHTMLAttributes } from "react";

type SelectTypes = InputHTMLAttributes<HTMLSelectElement>;

type SelectOption = {
  id: number;
  title: string;
  value: string;
};

type SelectProps = {
  label?: string;
  name: string;
  options: SelectOption[];
  hasAllOption?: string;
} & SelectTypes;

const Select = ({
  label,
  name,
  options,
  hasAllOption,
  ...props
}: SelectProps) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        className="block w-full py-2 pl-3 pr-10 mt-1 mb-1 text-base border-gray-300 rounded-md focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-50 focus:ring-primary focus:border-primary sm:text-sm"
        {...props}
      >
        {hasAllOption ? (
          <option value="" selected>
            {hasAllOption}
          </option>
        ) : (
          <option value="" selected disabled>
            {props.placeholder || "Selecione uma opção"}
          </option>
        )}
        {options.map((option: any) => (
          <option key={option.id} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
