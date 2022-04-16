import React from "react";

const Button: React.FC<
  { children: React.ReactNode } & React.HTMLProps<HTMLButtonElement>
> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      type="submit"
      className="ml-3 inline-flex text-secondary bg-accent shadow-lg justify-center py-2 px-4 border border-transparent text-sm font-medium"
    >
      {children}
    </button>
  );
};

export default Button;
