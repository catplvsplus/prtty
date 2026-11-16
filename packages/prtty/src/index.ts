import { styleText as nodeStyleText, type InspectColorBackground, type InspectColorForeground, type InspectColorModifier, type StyleTextOptions } from 'node:util';
import tty, { type WriteStream } from 'node:tty';

export class Prtty implements Prtty.ColorMap<Prtty.StyleTextFunction> {
    public styles: Prtty.Color[] = [];
    public options: StyleTextOptions = {};
    public disabled: boolean|(() => boolean) = !Prtty.supportsColor();

    constructor(options: StyleTextOptions = {}) {
        this.options = options;

        this.isDisabled = this.isDisabled.bind(this);
        this._chain = this._chain.bind(this);
    }

    public isDisabled(): boolean {
        return typeof this.disabled === 'boolean' ? this.disabled : this.disabled();
    }

    private _chain(styles: Prtty.Color[]): Prtty.StyleTextFunction {
        function style(this: Prtty, value?: unknown): Prtty|string {
            this.styles.push(...styles);

            if (typeof value !== 'undefined') {
                const result = this.isDisabled()
                    ? String(value)
                    : Prtty.styleText(this.styles, String(value), {
                        validateStream: false,
                        ...this.options
                    });

                this._clear();
                return result;
            }

            return this;
        }

        return style.bind(this) as Prtty.StyleTextFunction;
    }

    private _clear(): void {
        this.styles = [];
    }

    public hex(hex: Prtty.HexColor): Prtty.StyleTextFunction {
        return this._chain([hex]);
    }

    public black = this._chain(['black']);
    public blue = this._chain(['blue']);
    public blueBright = this._chain(['blueBright']);
    public cyan = this._chain(['cyan']);
    public cyanBright = this._chain(['cyanBright']);
    public gray = this._chain(['gray']);
    public green = this._chain(['green']);
    public greenBright = this._chain(['greenBright']);
    public magenta = this._chain(['magenta']);
    public magentaBright = this._chain(['magentaBright']);
    public red = this._chain(['red']);
    public redBright = this._chain(['redBright']);
    public white = this._chain(['white']);
    public whiteBright = this._chain(['whiteBright']);
    public yellow = this._chain(['yellow']);
    public yellowBright = this._chain(['yellowBright']);

    public bgBlack = this._chain(['bgBlack']);
    public bgBlue = this._chain(['bgBlue']);
    public bgBlueBright = this._chain(['bgBlueBright']);
    public bgCyan = this._chain(['bgCyan']);
    public bgCyanBright = this._chain(['bgCyanBright']);
    public bgGray = this._chain(['bgGray']);
    public bgGreen = this._chain(['bgGreen']);
    public bgGreenBright = this._chain(['bgGreenBright']);
    public bgMagenta = this._chain(['bgMagenta']);
    public bgMagentaBright = this._chain(['bgMagentaBright']);
    public bgRed = this._chain(['bgRed']);
    public bgRedBright = this._chain(['bgRedBright']);
    public bgWhite = this._chain(['bgWhite']);
    public bgWhiteBright = this._chain(['bgWhiteBright']);
    public bgYellow = this._chain(['bgYellow']);
    public bgYellowBright = this._chain(['bgYellowBright']);

    public blink = this._chain(['blink']);
    public bold = this._chain(['bold']);
    public dim = this._chain(['dim']);
    public doubleunderline = this._chain(['doubleunderline']);
    public hidden = this._chain(['hidden']);
    public inverse = this._chain(['inverse']);
    public italic = this._chain(['italic']);
    public reset = this._chain(['reset']);
    public strikethrough = this._chain(['strikethrough']);
    public underline = this._chain(['underline']);
}

export namespace Prtty {
    export type ForegroundColor = InspectColorForeground;
    export type BackgroundColor = InspectColorBackground;
    export type Modifier = InspectColorModifier;
    export type HexColor = `#${string}`;
    export type Color = ForegroundColor | BackgroundColor | Modifier | HexColor;

    export type ColorMap<T = any> = Record<Exclude<Color, HexColor>, T>;

    export type StyleTextFunction = {
        (value: unknown): string;
        (): Prtty;
    };

    export interface SupportsColorOptions {
        env?: NodeJS.ProcessEnv;
        argv?: string[];
        platform?: NodeJS.Platform;
        stream?: WriteStream & { fd?: number; };
    }

    /**
     * @see https://github.com/jorgebucaran/colorette/blob/fdfab65a93faa31f4335eb0bb945a306a732f023/index.js#L9-L23
     */
    export function supportsColor(options?: SupportsColorOptions): boolean {
        const { env = process.env, argv = process.argv, platform = process.platform, stream = process.stdout } = options ?? {};

        const isDisabled = "NO_COLOR" in env || argv.includes("--no-color");
        const isForced = "FORCE_COLOR" in env || argv.includes("--color");
        const isWindows = platform === "win32";
        const isDumbTerminal = env.TERM === "dumb";
        const isCI = "CI" in env && ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env);
        const isCompatibleTerminal = (
                typeof stream.fd === "number"
                    ? tty.isatty(stream.fd)
                    : stream.isTTY
            )
            && env.TERM
            && !isDumbTerminal;

        return !isDisabled && (isForced || (isWindows && !isDumbTerminal) || isCompatibleTerminal || isCI);
    }

    export function styleText(styles: Color|Color[], text: string, options?: StyleTextOptions): string {
        if (typeof nodeStyleText === 'function') {
            return nodeStyleText(styles, text, options);
        }

        throw new Error('nodeStyleText is not available in this environment. Please ensure you are running in a Node.js environment that supports the util module.');
    }
}

export const colors = new Prtty();