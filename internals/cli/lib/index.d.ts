declare class Constant {
    add<R extends object>(fn: (constant: this) => R): this & Readonly<R>;
}
export declare const constants: Constant & Readonly<{
    cwd: string;
    root: string;
}> & Readonly<{
    resolve: (...args: string[]) => string;
    resolveCwd: (...args: string[]) => string;
    resolveRoot: (...args: string[]) => string;
    relativeRoot: (arg: string) => string;
}> & Readonly<{
    resolveEsm: (...args: string[]) => string;
    resolveCjs: (...args: string[]) => string;
    resolveUmd: (...args: string[]) => string;
    resolveSrc: (...args: string[]) => string;
    resolveCore: (...args: string[]) => string;
    resolveIcons: (...args: string[]) => string;
    resolveShared: (...args: string[]) => string;
}> & Readonly<{
    core: string;
    icons: string;
    shared: string;
    esm: string;
    cjs: string;
    src: string;
}> & Readonly<{
    browserslist: {
        chrome: string;
        firefox: string;
        safari: string;
        edge: string;
    };
    ignoreFiles: string[];
    jsExtensions: string[];
    iconAttrNamePrefix: string;
    fullCssFileName: string;
}> & Readonly<{
    babelOptions: {
        babelHelpers: "runtime";
        babelrc: boolean;
        exclude: RegExp;
        extensions: string[];
        plugins: string[];
        presets: (string | (string | {
            targets: {
                chrome: string;
                firefox: string;
                safari: string;
                edge: string;
            };
        })[] | (string | {
            runtime: string;
        })[])[];
    };
    replaces: {
        preventAssignment: boolean;
        'process.env.NODE_ENV': string;
    };
}>;
export {};
