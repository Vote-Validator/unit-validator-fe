export const serializeStatesData = (states) => {
  return states.map((state) => {
    return { key: state.id, value: state.abbreviation, label: state.name };
  });
};
