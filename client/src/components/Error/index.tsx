import { ShieldExclamationIcon } from "@heroicons/react/24/outline";

type ErrorProps = {
  error: string;
  textColor: "text-red-700" | "text-yellow-700";
  bgColor: "bg-red-100" | "bg-yellow-100";
  borderColor: "border-red-400" | "border-yellow-400";
};

const Error = ({ error, textColor, bgColor, borderColor }: ErrorProps) => {
  return (
    <div
      className={`flex items-center justify-start px-4 py-3 mx-4 my-4 ${textColor} ${bgColor} border ${borderColor} rounded`}
      role="alert"
    >
      <ShieldExclamationIcon
        className={`w-6 h-6 mr-3 ${textColor} rounded-full`}
      />
      <span className="block sm:inline">{error}</span>
    </div>
  );
};

export default Error;
