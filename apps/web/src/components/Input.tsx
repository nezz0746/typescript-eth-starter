import React from "react";

const Input = (props: React.HTMLProps<HTMLInputElement>) => {
  return (
    <input
      {...props}
      type="text"
      className="shadow-sm  block w-full sm:text-sm border-gray-300"
    />
  );
};

export default Input;
