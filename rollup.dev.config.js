const rollup = require('rollup');
const typescript = require('@rollup/plugin-typescript');
const fs = require('fs');
const child_process = require('child_process');

fs.rmSync('./dist', { recursive: true, force: true });

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

async function build() {
  const { output: outputOption, ...inputOption } = config;
  const bundle = await rollup.rollup(inputOption);
  await bundle.generate(outputOption);
  await bundle.write(outputOption);
  try {
    child_process.spawn(`node`, [`dist/bundle.js`], { stdio: 'inherit' });
  } catch (e) {
    console.log(e);
  }
}

build();

exports.config = config;
