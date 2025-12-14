import { logger } from '@prtty/print';
import { colors } from '@prtty/prtty';

logger.info(colors.cyan(`Hello, ${colors.bold().bgBlue().white('World!')}`));