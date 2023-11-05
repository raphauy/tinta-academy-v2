export const formatPrice = (price: number) => {
  
  if (price === 0)
    return "Gratis"

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "decimal",  
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return `${formattedPrice} USD`
}
