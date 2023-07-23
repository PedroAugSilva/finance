export const formatValue = (value: number) => {
  const valueParsed = value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  return valueParsed;
};
