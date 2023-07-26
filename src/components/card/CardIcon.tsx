import { ElementType, ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"svg"> & {
  icon: ElementType;
};

const CardIcon = ({ icon: Icon, className }: Props) => {
  return <Icon className={twMerge("text-2xl text-zinc-200", className)} />;
};

export default CardIcon;
