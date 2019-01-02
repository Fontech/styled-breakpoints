import { pixelsToEm, getNextBreakValue, getBreakValue, getBelowValue } from './helpers';

/**
 * Default media breakpoints
 * @type {Object}
 */
export const defaultBreakpoints = {
  tablet: '768px',
  desktop: '992px',
  lgDesktop: '1200px',
};

const createMin = breakpointsMap => breakpointKey => {
  const ems = pixelsToEm(getBreakValue(breakpointKey, breakpointsMap));
  return `@media screen and (min-width: ${ems})`;
};

const createMax = breakpointsMap => breakpointKey => {
  const ems = pixelsToEm(getBelowValue(getNextBreakValue(breakpointKey, breakpointsMap)));
  return `@media screen and (max-width: ${ems})`;
};

const createBetween = breakpointsMap => (fromBp, toBp) => {
  const minEms = pixelsToEm(getBreakValue(fromBp, breakpointsMap));
  const maxEms = pixelsToEm(getBelowValue(getNextBreakValue(toBp, breakpointsMap)));
  return `@media screen and (min-width: ${minEms}) and (max-width: ${maxEms})`;
};

const createOnly = breakpointsMap => breakpointKey => {
  const minEms = pixelsToEm(getBreakValue(breakpointKey, breakpointsMap));
  const maxEms = pixelsToEm(getBelowValue(getNextBreakValue(breakpointKey, breakpointsMap)));
  return `@media screen and (min-width: ${minEms}) and (max-width: ${maxEms})`;
};

/**
 * Media query generator
 * @param {Object} breakpoints - Map labels to breakpoint sizes
 * @return {Object} - Media generators for each breakpoint
 */
export const createBreakpoints = (breakpoints = defaultBreakpoints) => {
  try {
    const valuesOfBreakpoints = Object.values(breakpoints);
    const repeatValues = valuesOfBreakpoints.filter((value, index, arr) => arr.indexOf(value) !== index);
    if (repeatValues.length > 0) {
      const isMore = repeatValues.length > 1;
      const repeatString = repeatValues.join(', ');
      throw new Error(
        `styled-breakpoints: There ${isMore ? 'are duplicate values' : 'is a duplicate value'} (${repeatString}) in breakpoints`,
      );
    }
  } catch (err) {
    console.error(err);
    return null;
  }
  const min = createMin(breakpoints);
  const max = createMax(breakpoints);
  const between = createBetween(breakpoints);
  const only = createOnly(breakpoints);

  return { min, max, between, only };
};

/**
 * Media object with default breakpoints
 * @return {object} - Media generators for each size
 */
export const { min, max, between, only } = createBreakpoints();
