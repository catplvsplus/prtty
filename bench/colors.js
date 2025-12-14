// @ts-check
import bench from 'benchmark';

import { colors as prtty } from '@prtty/prtty';
import chalk from 'chalk';
import kleur from 'kleur';
import colors from 'colors';
import picocolors from 'picocolors';
import ansicolors from 'ansi-colors';
import * as colorette from 'colorette';
import yoctocolors from 'yoctocolors';
import { styleText } from 'node:util';

/**
 * @param {any} c
 * @returns
 */
const test = (c) => c.red(`${c.bold(`${c.cyan(`${c.yellow("yellow")}cyan`)}`)}red`);
const testNode = () => styleText("red", `${styleText(["bold", "cyan"], `${styleText("yellow", "yellow")}cyan`)}red`);

/**
 * @type {{ name: string; hz: number; }[]}
 */
const runs = [];

new bench.Suite()
  .add("  chalk               ", () => test(chalk))
  .add("  kleur               ", () => test(kleur))
  .add("  colors              ", () => test(colors))
  .add("  ansi-colors         ", () => test(ansicolors))
  .add("  picocolors          ", () => test(picocolors))
  .add("  node:util.styleText ", () => testNode())
  .add("  colorette           ", () => test(colorette))
  .add("  yoctocolors         ", () => test(yoctocolors))
  .add("  @prtty/prtty        ", () => test(prtty))
  .on("cycle",
    /**
     * 
     * @param {any} event 
     * @returns 
     */
    event => runs.push({ name: event.target.name, hz: event.target.hz })
  )
  .run()

console.log(runs.sort((a, b) => b.hz - a.hz).map(r => r.name + `${Math.floor(r.hz).toLocaleString()} ops/sec`.padStart(18)).join("\n"));