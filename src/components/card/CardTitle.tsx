import React from "react";

interface Props {
  title: string;
}

const CardTitle = ({ title }: Props) => {
  return <span className="text-2xl">{title}</span>;
};

export default CardTitle;
