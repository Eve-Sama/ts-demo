const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');

/** @type {import('rollup').RollupOptions} */
const config = {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  plugins: [commonjs(), typescript()],
};

module.exports = config;
