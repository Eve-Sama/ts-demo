const rollup = require('rollup');
const fs = require('fs');
const child_process = require('child_process');
const config = require('./rollup.config');

fs.rmSync('./dist', { recursive: true, force: true });

async function build() {
  const { output: outputOption, ...inputOption } = config;
  const bundle = await rollup.rollup(inputOption);
  await bundle.generate(outputOption);
  await bundle.write(outputOption);
  try {
    child_process.spawn(`node`, [`dist/bundle.js`], { stdio: 'inherit', env: { ...process.env, NODE_ENV: 'development' } });
  } catch (e) {
    console.log(e);
  }
}

build();
