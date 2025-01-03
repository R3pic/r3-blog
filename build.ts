import type { BuildConfig } from 'bun';
import dts from 'bun-plugin-dts';

const defaultBuildConfig: BuildConfig = {
    entrypoints: ['./src/index.ts', './src/bin/blog.ts'],
    outdir: './dist',
    target: 'bun'
};

await Promise.all([
    Bun.build({
        ...defaultBuildConfig,
        plugins: [dts()],
        format: 'esm',
        naming: '[dir]/[name].js'
    }),
    Bun.build({
        ...defaultBuildConfig,
        format: 'cjs',
        naming: '[dir]/[name].cjs'
    })
]);