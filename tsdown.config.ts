import { defineConfig } from 'tsdown';

export default defineConfig({
    entry: './src/index.ts',
    outDir: './dist',
    tsconfig: './tsconfig.json',
    skipNodeModulesBundle: true,
    nodeProtocol: true,
    cjsDefault: false,
    format: ['cjs', 'esm'],
    platform: 'neutral',
    sourcemap: true,
    dts: true,
    clean: true,
});