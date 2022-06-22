const typescript = require('@rollup/plugin-typescript');

/** @type {import('rollup').RollupOptions} */
const config = {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  external: id => !/^[./]/.test(id),
  plugins: [typescript()],
};

module.exports = config;
