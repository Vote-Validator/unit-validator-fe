export const serializeStatesData = (states) => {
  return states.map((state) => {
    return { key: state.id, value: state.abbreviation, label: state.name };
  });
};

export const serializePartiesDataForSubmission = (data) => {
  const newValues = [...data].map((party) => {
    const newParty = { ...party };
    delete newParty.name;
    delete newParty.icon;
    newParty.score = +newParty.score;

    return newParty;
  });

  return newValues;
};
