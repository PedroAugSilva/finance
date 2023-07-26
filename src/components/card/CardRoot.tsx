import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const CardRoot = ({ children }: Props) => {
  return (
    <div className="w-52 h-32 bg-zinc-800 rounded-xl flex flex-col items-start justify-center py-2 px-5">
      {children}
    </div>
  );
};

export default CardRoot;
