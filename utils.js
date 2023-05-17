export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US").format(amount).replaceAll(",", " ")
