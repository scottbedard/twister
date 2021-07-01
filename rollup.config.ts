/* eslint-disable import/no-extraneous-dependencies */
// import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';
import eslint from '@rbnlffl/rollup-plugin-eslint';
import pkg from './package.json';
import ts from 'rollup-plugin-ts';

export default defineConfig({
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
    del({ targets: 'dist/*' }),
    eslint(),
    ts(),
  ],
});
