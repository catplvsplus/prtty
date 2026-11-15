import { defineConfig } from 'tsdown';

export default defineConfig({
    entry: './src/index.ts',
    outDir: './dist',
    tsconfig: './tsconfig.json',
    nodeProtocol: true,
    cjsDefault: false,
    format: ['cjs', 'esm'],
    platform: 'node',
    sourcemap: true,
    dts: true,
    clean: true,
    deps: {
        neverBundle: true
    }
});