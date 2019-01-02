import { pixelsToEm, getNextBreakValue, getBreakValue } from './helpers';

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
  const ems = pixelsToEm(getNextBreakValue(breakpointKey, breakpointsMap));
  return `@media screen and (max-width: ${ems})`;
};

const createBetween = breakpointsMap => (fromBp, toBp) => {
  const minEms = pixelsToEm(getBreakValue(fromBp, breakpointsMap));
  const maxEms = pixelsToEm(getNextBreakValue(toBp, breakpointsMap));
  return `@media screen and (min-width: ${minEms}) and (max-width: ${maxEms})`;
};

const createOnly = breakpointsMap => breakpointKey => {
  const minEms = pixelsToEm(getBreakValue(breakpointKey, breakpointsMap));
  const maxEms = pixelsToEm(getNextBreakValue(breakpointKey, breakpointsMap));
  return `@media screen and (min-width: ${minEms}) and (max-width: ${maxEms})`;
};

/**
 * Media query generator
 * @param {Object} breakpoints - Map labels to breakpoint sizes
 * @return {Object} - Media generators for each breakpoint
 */
export const createBreakpoints = (breakpoints = defaultBreakpoints) => {
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
