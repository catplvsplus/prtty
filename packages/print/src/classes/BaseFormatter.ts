import type { LogLevel } from '../types/constants.js';
import type { Logger } from './Logger.js';
import type { TTYWriteStream } from '../types/types.js';

export interface FormatterFormatOptions {
    level: LogLevel;
    messages: any[];
    logger: Logger;
    stream: TTYWriteStream;
}

export abstract class BaseFormatter {
    public abstract formatConsoleLog(options: FormatterFormatOptions): string;
    public abstract formatWriteStreamLog(options: FormatterFormatOptions): string;
}