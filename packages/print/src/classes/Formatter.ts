import { formatWithOptions, stripVTControlCharacters } from 'node:util';
import { BaseFormatter, type FormatterFormatOptions } from './BaseFormatter.js';
import { LogLevel } from '../types/constants.js';
import ansiRegex from 'ansi-regex';
import type { Logger } from './Logger.js';
import { Prtty } from '@prtty/prtty';

export class Formatter extends BaseFormatter {
    public disabled: boolean = false;
    public colors: Prtty = new Prtty();

    public formatConsoleLog(options: FormatterFormatOptions): string {
        if (!Prtty.supportsColor({ stream: options.stream })) return this.formatWriteStreamLog(options);

        const string: string = this.stringify(options.logger, ...options.messages);
        const prefix: string = this.getConsoleLogPrefix(options.level, options.logger);

        if (this.disabled) return string;

        const lines: string[] = string.split('\n');

        let lastAnsi: string|undefined = undefined;

        return this.appendPrefix(
                lines
                    .map((line, index) => {
                        const previousLine: string|undefined = lines[index - 1];
                        if (!previousLine) return line;

                        lastAnsi = previousLine.match(ansiRegex())?.pop() ?? lastAnsi;
                        return lastAnsi ? `${lastAnsi}${line}` : line;
                    })
                    .join('\n'),
                prefix
            );
    }

    public formatWriteStreamLog(options: FormatterFormatOptions): string {
        const string: string = this.stringify(options.logger, ...options.messages);
        const prefix: string = this.getWriteStreamLogPrefix(options.level, options.logger);

        return stripVTControlCharacters(this.disabled ? string : this.appendPrefix(string, prefix));
    }

    public stringify(logger: Logger, ...data: any[]): string {
        return formatWithOptions(logger?.objectInspectOptions ?? {}, ...data);
    }

    public appendPrefix(string: string, prefix: string): string {
        const lines: string[] = [];

        for (const line of string.split('\n')) {
            lines.push(prefix + line);
        }

        return lines.join('\n');
    }

    public getConsoleLogPrefix(level: LogLevel, logger: Logger): string {
        const date = new Date();
        const time = date.toLocaleTimeString(undefined, { hour12: false });

        let prefix: string = '';
        let color: typeof Prtty.styleText;

        switch (level) {
            case LogLevel.Error:
                prefix += this.colors.bgRed().bold().black(` ${LogLevel[level].toUpperCase()} `);
                color = this.colors.red;
                break;
            case LogLevel.Warn:
                prefix += this.colors.bgYellow().bold().black(` ${LogLevel[level].toUpperCase()}  `);
                color = this.colors.yellow;
                break;
            case LogLevel.Info:
                prefix += this.colors.bgCyan().bold().black(` ${LogLevel[level].toUpperCase()}  `);
                color = this.colors.cyan;
                break;
            case LogLevel.Debug:
                prefix += this.colors.bgMagenta().bold().white(` ${LogLevel[level].toUpperCase()} `);
                color = this.colors.magenta;
                break;
        }

        prefix += this.colors.dim(` ${color(time)}: `);

        if (logger?.label) {
            prefix += `${this.colors.dim('[')}${color(logger.label)}${this.colors.dim(']')} `;
        }

        return prefix;
    }

    public getWriteStreamLogPrefix(level: LogLevel, logger: Logger): string {
        const date = new Date();
        const time = date.toLocaleTimeString(undefined, { hour12: false });

        let prefix: string = `[${time}]`;

        if (logger?.label) {
            prefix += ` [${logger.label}/${LogLevel[level].toUpperCase()}]`;
        } else {
            prefix += ` [${LogLevel[level].toUpperCase()}]`;
        }

        return `${prefix}: `;
    }
}