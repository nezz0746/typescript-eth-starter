import classNames from "classnames";
import React from "react";

const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ className = "", children }) => {
  return (
    <div
      className={classNames(
        "p-5 relative overflow-hidden shadow-lg bg-neutral",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
