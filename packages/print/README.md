# @prtty/print

Just another Node.js logger library

## Installation

```bash
npm install @prtty/print
yarn add @prtty/print
pnpm add @prtty/print
bun install @prtty/print
deno add npm:@prtty/print
```

## Usage

```js
// Default instance usage
import { logger } from '@prtty/print';

logger.info('Hello, World!');
logger.debug('Hello, World!');
logger.warn('Hello, World!');
logger.error('Hello, World!');
```

```js
// Custom instance usage
import { logger as defaultLogger, Logger, FileWriteStreamMode, Formatter } from '@prtty/print';

const logger = new Logger({
    formatter: new Formatter(),                         // Formatter of log messages for console and write stream
    parent: defaultLogger,                              // Parent logger, events will also be emitted to this logger
    label: 'MyLogger',                                  // Label of the logger
    objectInspectOptions: { colors: true },             // Object inspect options
    logLevel: LogLevel.Info,                           // Log level of the console logger (default: LogLevel.Info)
    writeLevel: LogLevel.Info,                          // Log level of the log file write stream (default: LogLevel.Info)
    writeStream: await Logger.createFileWriteStream({   // Write stream to log to a file
        mode: FileWriteStreamMode.Rename,               // - Mode when dealing with old log file
        filename: './logs/latest.log',                  // - Filename of the log file
        renameFile: Utils.gzipCompressLog               // - Function to rename the log file
    }),
})

logger.info('Hello, World!');
logger.debug('Hello, World!');
logger.warn('Hello, World!');
logger.error('Hello, World!');
```

```js
// Clone instance usage
const newLogger = logger.clone({
    label: 'MyNewLogger'
});

newLogger.info('Hello, World!');
newLogger.debug('Hello, World!');
newLogger.warn('Hello, World!');
newLogger.error('Hello, World!');
```

```js
// Log to a file
import { logger, FileWriteStreamModem, Utils } from '@prtty/print';

await logger.createFileWriteStream({
    mode: FileWriteStreamMode.Rename,
    filename: './logs/latest.log',
    renameFile: Utils.gzipCompressLog
});
```
