const BROWSER_DEFAULT_FONT_SIZE = 16;
export const pixelsToEm = inPx =>
  `${parseFloat(inPx) / BROWSER_DEFAULT_FONT_SIZE}em`;

export const breakpointsToArray = (breakpoints) => {
  const result = Object.keys(breakpoints).map(key => ({
    name: key,
    value: breakpoints[key],
  }));
  result.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
  return result;
};

export const getBreakValue = (breakpointValue, breakpoints = {}) => {
  let result = null;

  try {
    if (breakpoints[breakpointValue]) {
      result = breakpoints[breakpointValue];
    } else if (parseInt(breakpointValue, 10)) {
      result = breakpointValue;
    } else {
      throw new Error(
        'styled-breakpoints: No valid breakpoint or size specified for media.',
      );
    }
  } catch (err) {
    console.warn(err);
  }

  return result;
};

export const getNextBreakValue = (breakpoint, breakpoints = {}) => {
  let result = null;
  const breakpointsArray = breakpointsToArray(breakpoints);
  const breakpointValueInt = parseInt(getBreakValue(breakpoint, breakpoints), 10);

  try {
    breakpointsArray.forEach(breakpointItem => {
      if (!result && breakpointValueInt < parseInt(breakpointItem.value, 10)) {
        result = breakpointItem.value;
      }
    });
    if (!result) {
      throw new Error(
        `"styled-breakpoints: There is no breakpoint greater than ${breakpoint}`,
      );
    }
  } catch (err) {
    console.warn(err);
    return null;
  }
  return result;
};

export const getBelowValue = (breakpointValue) => {
  try {
    if (breakpointValue) {
      return `${parseFloat(breakpointValue) - 0.02}px`;
    }
    throw new Error(
      'styled-breakpoints: No valid breakpoint or size specified for media.',
    );
  } catch (err) {
    console.warn(err);
  }
  return null;
};
