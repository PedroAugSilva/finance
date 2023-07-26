interface Props {
  content: string;
}

const CardContent = ({ content }: Props) => {
  return <h1 className="text-3xl mt-3">{content}</h1>;
};

export default CardContent;
