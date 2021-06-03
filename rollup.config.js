import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';
import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';

export default {
  external: [
    ...Object.keys(pkg.dependencies || {}),
  ],
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
    {
      file: pkg.unpkg,
      format: 'iife',
      name: 'Twister',
      plugins: [
        terser(),
      ],
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    del({
      targets: 'dist/*',
    }),
  ],
};
