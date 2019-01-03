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

const createMin = breakpoints => breakpoint => {
  const ems = pixelsToEm(getBreakValue(breakpoint, breakpoints));
  return `@media screen and (min-width: ${ems})`;
};

const createMax = breakpoints => breakpoint => {
  const ems = pixelsToEm(getBelowValue(getNextBreakValue(breakpoint, breakpoints)));
  return `@media screen and (max-width: ${ems})`;
};

const createBelow = breakpoints => breakpoint => {
  const ems = pixelsToEm(getBelowValue(getBreakValue(breakpoint, breakpoints)));
  return `@media screen and (max-width: ${ems})`;
};

const createBetween = breakpoints => (fromBp, toBp) => {
  const minEms = pixelsToEm(getBreakValue(fromBp, breakpoints));
  const maxEms = pixelsToEm(getBelowValue(getNextBreakValue(toBp, breakpoints)));
  return `@media screen and (min-width: ${minEms}) and (max-width: ${maxEms})`;
};

const createOnly = breakpoints => breakpoint => {
  const minEms = pixelsToEm(getBreakValue(breakpoint, breakpoints));
  const maxEms = pixelsToEm(getBelowValue(getNextBreakValue(breakpoint, breakpoints)));
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
  const below = createBelow(breakpoints);
  const between = createBetween(breakpoints);
  const only = createOnly(breakpoints);

  return { min, max, below, between, only };
};

/**
 * Media object with default breakpoints
 * @return {object} - Media generators for each size
 */
export const { min, max, below, between, only } = createBreakpoints();
