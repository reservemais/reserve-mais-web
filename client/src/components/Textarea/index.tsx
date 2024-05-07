import { ChangeEventHandler, TextareaHTMLAttributes } from "react";

type TextareaTypes = TextareaHTMLAttributes<HTMLTextAreaElement>;

type TextareaProps = {
  label: string;
  name: string;
  onChange?: ChangeEventHandler | undefined;
} & TextareaTypes;

const Textarea = ({ name, label, onChange, ...props }: TextareaProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-left text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1 mb-1">
        <textarea
          rows={4}
          name={name}
          id={name}
          onChange={onChange}
          className="block w-full border-gray-300 rounded-md shadow-sm resize-none disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-50 focus:ring-primary focus:border-primary sm:text-sm"
          {...props}
        />
      </div>
    </div>
  );
};

export default Textarea;
