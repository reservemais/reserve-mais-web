import { InputHTMLAttributes } from "react";

type RadioTypes = InputHTMLAttributes<HTMLInputElement>;

type RadioOption = {
  value: string;
  title: string;
};

type RadioProps = {
  label: string;
  name: string;
  legend: string;
  options: RadioOption[];
} & RadioTypes;

const Radio = ({ label, name, options, legend, ...props }: RadioProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-left text-gray-700">
        {label}
      </label>
      <fieldset className="mt-2 mb-6">
        <legend className="sr-only">{legend}</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {options.map((item) => (
            <div key={item.value} className="flex items-center">
              <input
                id={item.value}
                name={name}
                type="radio"
                className="w-4 h-4 border-gray-300 text-primary focus:ring-primary disabled:hover:bg-gray-400 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50"
                checked={item.value === props.value}
                {...props}
              />
              <label
                htmlFor={item.value}
                className="block ml-3 text-sm font-medium text-gray-700"
              >
                {item.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default Radio;
