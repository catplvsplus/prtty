import { logger } from '@prtty/print';

import { colors as prtty } from '@prtty/prtty';
import chalk from 'chalk';
import kleur from 'kleur';
import colors from 'colors';
import picocolors from 'picocolors';
import ansicolors from 'ansi-colors';
import * as colorette from 'colorette';
import yoctocolors from 'yoctocolors';
import { styleText } from 'node:util';

const test = (c) => c.red(`${c.bold(`${c.cyan(`${c.yellow("yellow")}cyan`)}`)}red`);
const testNode = () => styleText("red", `${styleText(["bold", "cyan"], `${styleText("yellow", "yellow")}cyan`)}red`);

logger.info(prtty.cyan(`Hello, ${prtty.bold().bgBlue().white('World!')}`));

logger.info('prtty\t', test(prtty));
logger.info('chalk\t', test(chalk));
logger.info('kleur\t', test(kleur));
logger.info('colors\t', test(colors));
logger.info('picocolors\t', test(picocolors));
logger.info('ansicolors\t', test(ansicolors));
logger.info('colorette\t', test(colorette));
logger.info('yoctocolors\t', test(yoctocolors));
logger.info('node:util\t', testNode());