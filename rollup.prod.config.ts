// import { terser } from 'rollup-plugin-terser';
// import { nodeResolve } from '@rollup/plugin-node-resolve';
// import json from '@rollup/plugin-json';
import { OutputOptions, rollup } from 'rollup';
import fs from 'fs';
import config from './rollup.config';
import fieldInfo from './constants';

// config.plugins!.push(...[terser({ ecma: 5 }), nodeResolve(), json()]);

fs.rmSync('./dist', { recursive: true, force: true });

async function build() {
  const { output: outputOption, ...inputOption } = config;
  const bundle = await rollup(inputOption);
  const output = outputOption as OutputOptions;
  await bundle.generate(output);
  await bundle.write(output);
  _dealBundle();
}

function _dealBundle(): void {
  const file = fs.readFileSync('dist/bundle.js', 'utf-8');
  let content = file;
  Object.entries(fieldInfo.production).forEach(item => {
    const value = item[1];
    content = file.replace(`'${value}'`, `${value}`);
  });
  fs.writeFile('dist/bundle.js', content, () => {});
}

build();
