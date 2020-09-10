import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import pkg from './package.json';

export default (args) => {
  const plugins = [json()];
  let sourceMap = false;

  if (!args.debug) {
    console.log('Running production build.');
    plugins.push(terser());
    sourceMap = true;
  }

  delete args.debug;

  return {
    input: pkg.input,
    output: [
      {
        file: pkg.module,
        format: 'esm',
      },
      {
        file: pkg.main,
        format: 'cjs',
      },
    ],
    plugins: [
      ...plugins,
      typescript({
        tsconfig: 'tsconfig.json',
        tsconfigOverride: {
          compilerOptions: { module: 'ESNext', sourceMap },
          exclude: ['**/*.spec.ts'],
          include: ['src/**/*.ts'],
        },
        useTsconfigDeclarationDir: true,
      }),
      resolve(),
      commonjs(),
    ],
    strictDeprecations: true,
  };
};
