"use client";
import { TrashSimple, CaretLeft } from "phosphor-react";
import clsx from "clsx";
import { useState } from "react";

interface IProps {
  description: string;
  value: string;
  revenue: "revenue" | "expense";
  onDelete: () => void;
}

export const Transaction = ({
  revenue,
  description,
  value,
  onDelete,
}: IProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleClick = async () => {
    await onDelete();
    setToggle(!toggle);
  };

  return (
    <div
      className={clsx("w-full rounded-lg h-10 pl-4 pr-8 grid grid-cols-3", {
        "bg-red-500/30": revenue === "expense",
        "bg-emerald-500/30": revenue === "revenue",
      })}
    >
      <span className="flex flex-row items-center justify-start ">
        {description}
      </span>
      <span className="flex flex-row items-center justify-start ">
        {revenue === "revenue" ? "" : "-"}
        {value}
      </span>
      <div className="flex flex-row items-center justify-end gap-2 ">
        <button onClick={() => setToggle(!toggle)}>
          {toggle ? <CaretLeft size={24} /> : <TrashSimple size={26} />}
        </button>
        <button
          onClick={handleClick}
          className={clsx(
            "overflow-hidden transition-all h-7 bg-red-500 duration-500 rounded",
            {
              "w-24 px-2 ": toggle,
              "w-0 px-0": !toggle,
            }
          )}
        >
          confirmar
        </button>
      </div>
    </div>
  );
};
