import { InputHTMLAttributes } from "react";

type CheckboxTypes = InputHTMLAttributes<HTMLInputElement>;

type CheckboxProps = {
  label: string;
  name: string;
  legend: string;
  options: any[];
} & CheckboxTypes;

const Checkbox = ({
  label,
  legend,
  name,
  options,
  ...props
}: CheckboxProps) => {
  return (
    <div className="my-4 space-y-2">
      <label className="block text-sm font-medium text-left text-gray-700">
        {label}
      </label>
      <legend className="sr-only">{legend}</legend>
      <div className="relative flex items-center gap-2 ">
        {options.map((item) => {
          return (
            <>
              <div key={item.id} className="flex items-start ">
                <input
                  id={item.id}
                  aria-describedby={item.tite}
                  name={item.id}
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary"
                  {...props}
                />
              </div>
              <div className="mr-3 text-sm">
                <label htmlFor={item.id} className="font-medium text-gray-700">
                  {item.title}
                </label>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Checkbox;
