export const screenSize = {
  xs: "575px",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1400px",
};

export const screen = {
  xs: `(max-width: 575px) and (min-width: 0px)`,
  sm: `max-width: ${screenSize.sm}`,
  md: `max-width: ${screenSize.md}`,
  lg: `max-width: ${screenSize.lg}`,
  xl: `max-width: ${screenSize.xl}`,
  xxl: `max-width: ${screenSize.xxl}`,
};
