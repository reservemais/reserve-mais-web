import React from "react";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="w-12 h-12 border border-t-4 rounded-full border-secondary animate-spin"></div>
  </div>
);

export default LoadingSpinner;
