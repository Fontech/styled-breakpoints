# styled-breakpoints

Simple and powerful css breakpoints for [styled-components](https://github.com/styled-components/styled-components).

> You can use it with [emotion](https://github.com/emotion-js/emotion) too

## Demo Sandbox

<a href="https://codesandbox.io/s/yqk8445y91" target='_blank'>
  <img alt="Edit @sorosora/styled-breakpoints demo" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

<a href="https://yqk8445y91.codesandbox.io/" target='_blank'>fullscreen</a>

## Installation

Use yarn or npm

```
yarn add @sorosora/styled-breakpoints
```

```
npm i @sorosora/styled-breakpoints
```

## Get Started

The following values of breakpoints are used by default.

```js
const defaultBreakpoints = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
};
```

```js
import styled from 'styled-components';
import { min, max, below, between, only } from '@sorosora/styled-breakpoints';

const SyledComponent = styled.div`
  background-color: pink;

  ${min('md')} {
    background-color: hotpink;
  }
`;
```

Converts to pure css:

```css
div {
  background-color: pink;
}
/* 768px / 16px */
@media screen and (min-width: 48em) {
  div {
    background-color: hotpink;
  }
}
```

### Min

```js
css`
  ${min('md')} {
    background-color: hotpink;
  }
`;
```

Converts to:

```css
@media screen and (min-width: 48em) {
  div {
    background-color: hotpink;
  }
}
```

### Max

```js
css`
  ${max('lg')} {
    background-color: lightcoral;
  }
`;
```

Converts to:

```css
/* (1200px - 0.02px) / 16px */
@media screen and (max-width: 74.99875em) {
  div {
    background-color: lightcoral;
  }
}
```

### Below

```js
css`
  ${max('sm')} {
    background-color: aliceblue;
  }
`;
```

Converts to:

```css
/* (576px - 0.02px) / 16px */
@media screen and (max-width: 35.99875em) {
  div {
    background-color: aliceblue;
  }
}
```

### Between

```js
css`
  ${between('md', 'lg')} {
    background-color: hotpink;
  }
`;
```

Converts to:

```css
/* 768px / 16px                  (1200px - 0.02px) / 16px */
@media screen and (min-width: 48em) and (max-width: 74.99875em) {
  div {
    background-color: hotpink;
  }
}
```

### Only

```js
css`
  ${only('md')} {
    background-color: rebeccapurple;
  }
`;
```

Converts to:

```css
/*
  768px / 16px                  (992px - 0.02px) / 16px */
@media screen and (min-width: 48em) and (max-width: 61.99875em) {
  div {
    background-color: rebeccapurple;
  }
}
```

### Custom breakpoints

```js
import styled from 'styled-components';
import { createBreakpoints } from '@sorosora/styled-breakpoints';

 /**
  * If you use desktop-first RWD, you should set the smallest breakpoint to '0px'
  * or use below(THE_SECOND_SMALLEST) to represent that one
  */
const breakpoints = {
  phone: '0px',
  tablet: '768px',
  desktop: '1200px',
}

const { min, max, below, between, only } = createBreakpoints(breakpoints);

const StyledComponent = styled.div`
  background-color: pink;

  ${min('tablet')} {
    background-color: hotpink;
  }
`;
```

## Recommended usage

### Order of media query

Mobile-first

| xs | sm | md | lg | xl | xxl |
| --- | --- | --- | --- | --- | --- |
| <576px | ≥576px | ≥768px | ≥992px | ≥1200px | ≥1600px |
|  | min('sm') | min('md') | min('lg') | min('xl') | min('xxl') |

```js
const StyledComponent = styled.div`
  /* xs */

  ${min('sm')} {
    /* sm */
  }

  ${min('md')} {
    /* md */
  }

  ...and so on
`;
```

Desktop-first

| xs | sm | md | lg | xl | xxl |
| --- | --- | --- | --- | --- | --- |
| <576px | <768px | <992px | <1200px | <1600px | ≥1600px |
| max('xs') | max('sm') | max('md') | max('lg') | max('xl') |  |

```js
const StyledComponent = styled.div`
  /* xxl */

  ${max('xl')} {
    /* xl */
  }

  ${max('lg')} {
    /* lg */
  }

  ...and so on
`;
```

### With theme

```js
import styled, { ThemeProvider } from 'styled-components';
import { createBreakpoints } from '@sorosora/styled-breakpoints';

const { min } = createBreakpoints();

const theme = {
  media: {
    sm: min('sm'),
    md: min('md'),
    lg: min('lg'),
    xl: min('xl'),
    xxl: min('xxl'),
  },
}

const StyledComponents = styled.div`
  /* xs */

  ${({ theme }) => theme.media.sm} {
    /* sm */
  }

  ${({ theme }) => theme.media.md} {
    /* md */
  }

  ...
`;

export const Layout = () => (
  <ThemeProvider theme={theme}>
    <StyledComponents />
  </ThemeProvider>
);

```

## License

MIT License

Copyright (c) 2018 Maxim Alyoshin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
