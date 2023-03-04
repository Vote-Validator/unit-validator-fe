export const getPartyColor = (party) => {
  if (party === "APC") {
    return "#5bc2e5";
  }
  if (party === "LP") {
    return "#008425";
  }
  if (party === "NNPP") {
    return "#0493e0";
  }

  return "#ed3237";
};
