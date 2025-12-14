# prtty

A simple and minimalistic terminal styling library wrapper for Node.js' default `node:utils#styleText()` function.

## Installation
```bash
npm install prtty
yarn add prtty
pnpm add prtty
bun install prtty
deno add npm:prtty
```

## Usage
```ts
import { colors } from 'prtty';                                 // const { colors } = require('prtty');

console.log(colors.red('Hello, world!'));                       // \x1B[31mHello, world!\x1B[39m
console.log(colors.red().bold().underline('Hello, world!'));    // \x1B[31m\x1B[1m\x1B[4mHello, world!\x1B[24m\x1B[22m\x1B[39m
```

## Disabling styles

```ts
import { colors } from 'prtty';

colors.disabled = true;

console.log(colors.red('Hello, world!'));                       // Hello, world!
console.log(colors.red().bold().underline('Hello, world!'));    // Hello, world!
```

```ts
import { colors } from 'prtty';
import supportsColor from 'supports-color';

colors.disabled = () => !supportsColor.stdout;

console.log(colors.red('Hello, world!'));                       // Hello, world!
console.log(colors.red().bold().underline('Hello, world!'));    // Hello, world!
```

## Available styles

All available styles can be found here:
- [Modifiers](https://nodejs.org/api/util.html#modifiers)
- [Foreground](https://nodejs.org/api/util.html#foreground-colors)
- [Background](https://nodejs.org/api/util.html#background-colors)