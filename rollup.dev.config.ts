import { OutputOptions, rollup } from 'rollup';
import fs from 'fs';
import child_process from 'child_process';
import config from './rollup.config';

fs.rmSync('./dist', { recursive: true, force: true });

async function build() {
  const { output: outputOption, ...inputOption } = config;
  const bundle = await rollup(inputOption);
  const output = outputOption as OutputOptions;
  await bundle.generate(output);
  await bundle.write(output);
  try {
    child_process.spawn(`node`, [`dist/bundle.js`], { stdio: 'inherit', env: { ...process.env, NODE_ENV: 'development' } });
  } catch (e) {
    console.log(e);
  }
}

build();
