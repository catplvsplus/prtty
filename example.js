import { logger, Logger, LogLevel } from '@prtty/print';

import { colors as prtty } from '@prtty/prtty';
import chalk from 'chalk';
import kleur from 'kleur';
import colors from 'colors';
import picocolors from 'picocolors';
import ansicolors from 'ansi-colors';
import * as colorette from 'colorette';
import yoctocolors from 'yoctocolors';
import { styleText } from 'node:util';

const newLogger = new Logger({
    label: 'example',
    level: LogLevel.Info
})

const test = (c) => c.red(`${c.bold(`${c.cyan(`${c.yellow("yellow")}cyan`)}`)}red`);
const testNode = () => styleText("red", `${styleText(["bold", "cyan"], `${styleText("yellow", "yellow")}cyan`)}red`);

newLogger.info(prtty.cyan(`Hello, ${prtty.bold().bgBlue().white('World!')}`));

newLogger.info('prtty\t', test(prtty));
newLogger.info('chalk\t', test(chalk));
newLogger.info('kleur\t', test(kleur));
newLogger.info('colors\t', test(colors));
newLogger.info('picocolors\t', test(picocolors));
newLogger.info('ansicolors\t', test(ansicolors));
newLogger.info('colorette\t', test(colorette));
newLogger.info('yoctocolors\t', test(yoctocolors));
newLogger.info('node:util\t', testNode());

logger.info('prtty\t', test(prtty));
logger.info('chalk\t', test(chalk));
logger.info('kleur\t', test(kleur));
logger.info('colors\t', test(colors));
logger.info('picocolors\t', test(picocolors));
logger.info('ansicolors\t', test(ansicolors));
logger.info('colorette\t', test(colorette));
logger.info('yoctocolors\t', test(yoctocolors));
logger.info('node:util\t', testNode());