const formatPrice = (price: number) => {
  return (price / 100).toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
  });
};

export { formatPrice };
