import { build } from 'tsup';

async function runBuild() {
    try {
        await build({
            entry: ['src/index.ts'],
            format: ['cjs', 'esm'],
            dts: true,
            clean: true
        });
        await build({
            entry: ['src/bin/blog.ts'],
            outDir: './dist/bin/',
            format: ['esm'],
            target: 'esnext',
            platform: 'node'
        });
        console.log('Build completed successfully.');
    } catch (error) {
        console.error('Build failed:', error);
    }
}

await runBuild();