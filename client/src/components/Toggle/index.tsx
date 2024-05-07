"use client";

import { Switch } from "@headlessui/react";

type ToggleProps = {
  label: string;
  description?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const Toggle = ({
  label,
  description,
  checked,
  disabled,
  onChange,
}: ToggleProps) => {
  return (
    <Switch.Group
      as="div"
      className="flex items-center justify-between mt-3 mb-3"
    >
      <span className="flex flex-col flex-grow">
        <Switch.Label
          as="span"
          className="text-sm font-medium text-gray-900"
          passive
        >
          {label}
        </Switch.Label>
        {description && (
          <Switch.Description as="span" className="text-sm text-gray-500">
            {description}
          </Switch.Description>
        )}
      </span>
      <Switch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={classNames(
          checked ? "bg-primary" : "bg-gray-200",
          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:cursor-not-allowed"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            checked ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          )}
        />
      </Switch>
    </Switch.Group>
  );
};

export default Toggle;
