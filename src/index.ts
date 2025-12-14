import { styleText, type StyleTextOptions } from 'node:util';

export class Prtty {
    public value: string;
    public styles: Prtty.Styles[] = [];
    public options: StyleTextOptions = {};
    public disabled: boolean|(() => boolean) = false;

    constructor(value: string = '', options: StyleTextOptions = {}) {
        this.value = value;
        this.options = options;

        this.toString = this.toString.bind(this);
        this.isDisabled = this.isDisabled.bind(this);

        this.black = this.black.bind(this);
        this.blackBright = this.blackBright.bind(this);
        this.blue = this.blue.bind(this);
        this.blueBright = this.blueBright.bind(this);
        this.cyan = this.cyan.bind(this);
        this.cyanBright = this.cyanBright.bind(this);
        this.gray = this.gray.bind(this);
        this.green = this.green.bind(this);
        this.greenBright = this.greenBright.bind(this);
        this.grey = this.grey.bind(this);
        this.magenta = this.magenta.bind(this);
        this.magentaBright = this.magentaBright.bind(this);
        this.red = this.red.bind(this);
        this.redBright = this.redBright.bind(this);
        this.white = this.white.bind(this);
        this.whiteBright = this.whiteBright.bind(this);

        this.bgBlack = this.bgBlack.bind(this);
        this.bgBlackBright = this.bgBlackBright.bind(this);
        this.bgBlue = this.bgBlue.bind(this);
        this.bgBlueBright = this.bgBlueBright.bind(this);
        this.bgCyan = this.bgCyan.bind(this);
        this.bgCyanBright = this.bgCyanBright.bind(this);
        this.bgGray = this.bgGray.bind(this);
        this.bgGreen = this.bgGreen.bind(this);
        this.bgGreenBright = this.bgGreenBright.bind(this);
        this.bgGrey = this.bgGrey.bind(this);
        this.bgMagenta = this.bgMagenta.bind(this);
        this.bgMagentaBright = this.bgMagentaBright.bind(this);
        this.bgRed = this.bgRed.bind(this);
        this.bgRedBright = this.bgRedBright.bind(this);
        this.bgWhite = this.bgWhite.bind(this);
        this.bgWhiteBright = this.bgWhiteBright.bind(this);

        this.blink = this.blink.bind(this);
        this.bold = this.bold.bind(this);
        this.dim = this.dim.bind(this);
        this.doubleunderline = this.doubleunderline.bind(this);
        this.framed = this.framed.bind(this);
        this.hidden = this.hidden.bind(this);
        this.inverse = this.inverse.bind(this);
        this.italic = this.italic.bind(this);
        this.none = this.none.bind(this);
        this.overlined = this.overlined.bind(this);
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

    private chain(styles: Prtty.Styles[], value?: string): Prtty|string {
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

    // Foreground
    public black(value?: string): Prtty|string {
        return this.chain(['black'], value);
    }

    public blackBright(value?: string): Prtty|string {
        return this.chain(['blackBright'], value);
    }

    public blue(value?: string): Prtty|string {
        return this.chain(['blue'], value);
    }

    public blueBright(value?: string): Prtty|string {
        return this.chain(['blueBright'], value);
    }

    public cyan(value?: string): Prtty|string {
        return this.chain(['cyan'], value);
    }

    public cyanBright(value?: string): Prtty|string {
        return this.chain(['cyanBright'], value);
    }

    public gray(value?: string): Prtty|string {
        return this.chain(['gray'], value);
    }

    public green(value?: string): Prtty|string {
        return this.chain(['green'], value);
    }

    public greenBright(value?: string): Prtty|string {
        return this.chain(['greenBright'], value);
    }

    public grey(value?: string): Prtty|string {
        return this.chain(['grey'], value);
    }

    public magenta(value?: string): Prtty|string {
        return this.chain(['magenta'], value);
    }

    public magentaBright(value?: string): Prtty|string {
        return this.chain(['magentaBright'], value);
    }

    public red(value?: string): Prtty|string {
        return this.chain(['red'], value);
    }

    public redBright(value?: string): Prtty|string {
        return this.chain(['redBright'], value);
    }

    public white(value?: string): Prtty|string {
        return this.chain(['white'], value);
    }

    public whiteBright(value?: string): Prtty|string {
        return this.chain(['whiteBright'], value);
    }

    public yellow(value?: string): Prtty|string {
        return this.chain(['yellow'], value);
    }

    public yellowBright(value?: string): Prtty|string {
        return this.chain(['yellowBright'], value);
    }

    // Background
    public bgBlack(value?: string): Prtty|string {
        return this.chain(['bgBlack'], value);
    }

    public bgBlackBright(value?: string): Prtty|string {
        return this.chain(['bgBlackBright'], value);
    }

    public bgBlue(value?: string): Prtty|string {
        return this.chain(['bgBlue'], value);
    }

    public bgBlueBright(value?: string): Prtty|string {
        return this.chain(['bgBlueBright'], value);
    }

    public bgCyan(value?: string): Prtty|string {
        return this.chain(['bgCyan'], value);
    }

    public bgCyanBright(value?: string): Prtty|string {
        return this.chain(['bgCyanBright'], value);
    }

    public bgGray(value?: string): Prtty|string {
        return this.chain(['bgGray'], value);
    }

    public bgGreen(value?: string): Prtty|string {
        return this.chain(['bgGreen'], value);
    }

    public bgGreenBright(value?: string): Prtty|string {
        return this.chain(['bgGreenBright'], value);
    }

    public bgGrey(value?: string): Prtty|string {
        return this.chain(['bgGrey'], value);
    }

    public bgMagenta(value?: string): Prtty|string {
        return this.chain(['bgMagenta'], value);
    }

    public bgMagentaBright(value?: string): Prtty|string {
        return this.chain(['bgMagentaBright'], value);
    }

    public bgRed(value?: string): Prtty|string {
        return this.chain(['bgRed'], value);
    }

    public bgRedBright(value?: string): Prtty|string {
        return this.chain(['bgRedBright'], value);
    }

    public bgWhite(value?: string): Prtty|string {
        return this.chain(['bgWhite'], value);
    }

    public bgWhiteBright(value?: string): Prtty|string {
        return this.chain(['bgWhiteBright'], value);
    }

    public bgYellow(value?: string): Prtty|string {
        return this.chain(['bgYellow'], value);
    }

    public bgYellowBright(value?: string): Prtty|string {
        return this.chain(['bgYellowBright'], value);
    }

    // Modifiers
    public blink(value?: string): Prtty|string {
        return this.chain(['blink'], value);
    }

    public bold(value?: string): Prtty|string {
        return this.chain(['bold'], value);
    }

    public dim(value?: string): Prtty|string {
        return this.chain(['dim'], value);
    }

    public doubleunderline(value?: string): Prtty|string {
        return this.chain(['doubleunderline'], value);
    }

    public framed(value?: string): Prtty|string {
        return this.chain(['framed'], value);
    }

    public hidden(value?: string): Prtty|string {
        return this.chain(['hidden'], value);
    }

    public inverse(value?: string): Prtty|string {
        return this.chain(['inverse'], value);
    }

    public italic(value?: string): Prtty|string {
        return this.chain(['italic'], value);
    }

    public none(value?: string): Prtty|string {
        return this.chain(['none'], value);
    }

    public overlined(value?: string): Prtty|string {
        return this.chain(['overlined'], value);
    }

    public reset(value?: string): Prtty|string {
        return this.chain(['reset'], value);
    }

    public strikethrough(value?: string): Prtty|string {
        return this.chain(['strikethrough'], value);
    }

    public underline(value?: string): Prtty|string {
        return this.chain(['underline'], value);
    }
}

export namespace Prtty {
    export type Styles = ForegroundColors|BackgroundColors|Modifiers;

    export type ForegroundColors =
        | "black"
        | "blackBright"
        | "blue"
        | "blueBright"
        | "cyan"
        | "cyanBright"
        | "gray"
        | "green"
        | "greenBright"
        | "grey"
        | "magenta"
        | "magentaBright"
        | "red"
        | "redBright"
        | "white"
        | "whiteBright"
        | "yellow"
        | "yellowBright";

    export type BackgroundColors =
        | "bgBlack"
        | "bgBlackBright"
        | "bgBlue"
        | "bgBlueBright"
        | "bgCyan"
        | "bgCyanBright"
        | "bgGray"
        | "bgGreen"
        | "bgGreenBright"
        | "bgGrey"
        | "bgMagenta"
        | "bgMagentaBright"
        | "bgRed"
        | "bgRedBright"
        | "bgWhite"
        | "bgWhiteBright"
        | "bgYellow"
        | "bgYellowBright";

    export type Modifiers =
        | "blink"
        | "bold"
        | "dim"
        | "doubleunderline"
        | "framed"
        | "hidden"
        | "inverse"
        | "italic"
        | "none"
        | "overlined"
        | "reset"
        | "strikethrough"
        | "underline";
}

export const colors = new Prtty();