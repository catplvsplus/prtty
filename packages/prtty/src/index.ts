import { styleText, type InspectColor, type InspectColorBackground, type InspectColorForeground, type InspectColorModifier, type StyleTextOptions } from 'node:util';
import tty from 'node:tty';

export class Prtty implements Prtty.ColorMap {
    public value: string;
    public styles: Prtty.Styles[] = [];
    public options: StyleTextOptions = {};
    public disabled: boolean|(() => boolean) = !Prtty.supportsColor();

    constructor(options: StyleTextOptions = {}) {
        this.value = '';
        this.options = options;

        this.toString = this.toString.bind(this);
        this.isDisabled = this.isDisabled.bind(this);
        this._chain = this._chain.bind(this);

        this.black = this.black.bind(this);
        this.blue = this.blue.bind(this);
        this.blueBright = this.blueBright.bind(this);
        this.cyan = this.cyan.bind(this);
        this.cyanBright = this.cyanBright.bind(this);
        this.gray = this.gray.bind(this);
        this.green = this.green.bind(this);
        this.greenBright = this.greenBright.bind(this);
        this.magenta = this.magenta.bind(this);
        this.magentaBright = this.magentaBright.bind(this);
        this.red = this.red.bind(this);
        this.redBright = this.redBright.bind(this);
        this.white = this.white.bind(this);
        this.whiteBright = this.whiteBright.bind(this);
        this.yellow = this.yellow.bind(this);
        this.yellowBright = this.yellowBright.bind(this);

        this.bgBlack = this.bgBlack.bind(this);
        this.bgBlue = this.bgBlue.bind(this);
        this.bgBlueBright = this.bgBlueBright.bind(this);
        this.bgCyan = this.bgCyan.bind(this);
        this.bgCyanBright = this.bgCyanBright.bind(this);
        this.bgGray = this.bgGray.bind(this);
        this.bgGreen = this.bgGreen.bind(this);
        this.bgGreenBright = this.bgGreenBright.bind(this);
        this.bgMagenta = this.bgMagenta.bind(this);
        this.bgMagentaBright = this.bgMagentaBright.bind(this);
        this.bgRed = this.bgRed.bind(this);
        this.bgRedBright = this.bgRedBright.bind(this);
        this.bgWhite = this.bgWhite.bind(this);
        this.bgWhiteBright = this.bgWhiteBright.bind(this);
        this.bgYellow = this.bgYellow.bind(this);
        this.bgYellowBright = this.bgYellowBright.bind(this);

        this.blink = this.blink.bind(this);
        this.bold = this.bold.bind(this);
        this.dim = this.dim.bind(this);
        this.doubleunderline = this.doubleunderline.bind(this);
        this.hidden = this.hidden.bind(this);
        this.inverse = this.inverse.bind(this);
        this.italic = this.italic.bind(this);
        this.reset = this.reset.bind(this);
        this.strikethrough = this.strikethrough.bind(this);
        this.underline = this.underline.bind(this);
    }

    public toString(): string {
        return this.isDisabled() ? String(this.value) : styleText(this.styles, String(this.value));
    }

    public isDisabled(): boolean {
        return typeof this.disabled === 'boolean' ? this.disabled : this.disabled();
    }

    private _chain(styles: Prtty.Styles[]): typeof Prtty.styleText {
        function style(value?: string): Prtty|string {
            this.value = value ?? this.value;
            this.styles = this.styles.concat(styles);

            if (typeof value === 'string') {
                const result = this.toString();

                this.value = '';
                this.styles = [];

                return result;
            }

            return this;
        }

        return style as typeof Prtty.styleText;
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
    export type Styles = InspectColor;

    export type ForegroundColors = InspectColorForeground;

    export type BackgroundColors = InspectColorBackground;

    export type Modifiers = InspectColorModifier;

    export type ColorMap<T = any> = Record<InspectColor, T>;

    export function styleText(value: string): string;
    export function styleText(): Prtty;
    export function styleText(value?: string): Prtty|string {
        throw new Error('This function should not be called directly.');
    }

    /**
     * @see https://github.com/jorgebucaran/colorette/blob/fdfab65a93faa31f4335eb0bb945a306a732f023/index.js#L9-L23
     */
    export function supportsColor(options?: { env?: NodeJS.ProcessEnv; argv?: string[]; platform?: NodeJS.Platform; }): boolean {
        const { env = process.env, argv = process.argv, platform = process.platform } = options ?? {};

        const isDisabled = "NO_COLOR" in env || argv.includes("--no-color");
        const isForced = "FORCE_COLOR" in env || argv.includes("--color");
        const isWindows = platform === "win32";
        const isDumbTerminal = env.TERM === "dumb";
        const isCompatibleTerminal = tty.isatty(1) && env.TERM && !isDumbTerminal;
        const isCI = "CI" in env && ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env);

        return !isDisabled && (isForced || (isWindows && !isDumbTerminal) || isCompatibleTerminal || isCI);
    }
}

export const colors = new Prtty();