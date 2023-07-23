import { IconProps } from "phosphor-react";
import React from "react";

interface IProps {
  title: string;
  TitleIcon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  content: string;
}

export const Card = ({ title, TitleIcon, content }: IProps) => {
  return (
    <div className="w-52 h-32 bg-zinc-800 rounded-xl flex flex-col items-start justify-center py-2 px-5">
      <span className="w-full flex flex-row justify-between items-center text-2xl">
        {title} <TitleIcon size={32} />
      </span>
      <h1 className="text-3xl mt-3">{content ? content : "loading..."}</h1>
    </div>
  );
};
