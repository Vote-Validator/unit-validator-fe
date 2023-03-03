const ALLOWED_PARTIES = ["APC", "PDP", "NNPP", "LP"];
export const getAllowedParties = (parties, key = "name") => {
  const filteredParties = parties.filter((party) =>
    ALLOWED_PARTIES.includes(party[key])
  );
  return filteredParties;
};
