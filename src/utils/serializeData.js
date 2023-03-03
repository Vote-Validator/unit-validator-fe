export const serializeStatesData = (states) => {
  return states.map((state) => {
    return { id: state.id, label: `${state.id} - ${state.name}` };
  });
};

export const serializeLGAData = (lga) => {
  return lga.map((state) => {
    return { id: state.id, label: `${state.id} - ${state.name}` };
  });
};

export const serializePollingUnitData = (pollingUnit) => {
  return pollingUnit.map((state) => {
    return {
      id: state.abbreviation,
      label: `${state.abbreviation} - ${state.name}`,
    };
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
