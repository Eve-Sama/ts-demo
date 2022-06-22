import { RollupOptions } from 'rollup';

const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');

const config: RollupOptions = {
  input: './src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  plugins: [commonjs(), typescript()],
  external: id => !/^[./]/.test(id),
};

export default config;
