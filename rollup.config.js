import del from 'rollup-plugin-delete';
import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs'
        },
        {
            file: pkg.module,
            format: 'es'
        },
        {
            file: pkg.browser,
            format: 'iife',
            name: 'Twister'
        },
    ],
    external: [
        ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [
        del({
            targets: 'dist/*',
        }),
        typescript({
            typescript: require('typescript'),
        }),
        terser(),
    ],
};
