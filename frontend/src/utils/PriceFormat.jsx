const FormatPrice = ({ price }) => {
  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(parseInt(price));
};

export default FormatPrice;
