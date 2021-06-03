import { terser } from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'
import eslint from '@rollup/plugin-eslint'
import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'

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
    },
  ],
  plugins: [
    eslint(),
    typescript(),
    del({ targets: 'dist/*' }),
  ],
};
