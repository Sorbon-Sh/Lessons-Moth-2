import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const Box = ({ children, className = "" }: Props) => {
  return <div className={`p-8 shadow-lg rounded-lg bg-white ${className}`}>{children}</div>;
};

export default Box;
