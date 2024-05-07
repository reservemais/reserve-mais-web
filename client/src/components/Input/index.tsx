import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from "react";

type InputTypes = InputHTMLAttributes<HTMLInputElement>;

type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
  value?: string | number | Date;
  onChange?: ChangeEventHandler | undefined;
  type: HTMLInputTypeAttribute;
} & InputTypes;

const Input = ({
  label,
  name,
  placeholder,
  value,
  type,
  onChange,
  ...props
}: InputProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-left text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1 mb-1">
        <input
          type={type}
          name={name}
          id={name}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-50"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
