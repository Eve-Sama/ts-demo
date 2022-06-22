import { terser } from 'rollup-plugin-terser';
import constants from './constants';
import { OutputOptions, rollup } from 'rollup';
import fs from 'fs';
import config from './rollup.config';

config.plugins!.push(...[terser({ ecma: 5 })]);

fs.rmSync('./dist', { recursive: true, force: true });

async function build() {
  const { output: outputOption, ...inputOption } = config;
  const bundle = await rollup(inputOption);
  const output = outputOption as OutputOptions;
  await bundle.generate(output);
  await bundle.write(output);
  const file = await fs.readFileSync('dist/bundle.js', 'utf-8');
  const newContent = file.replace(`"${constants.id}"`, `${constants.id}`);
  fs.writeFile('dist/bundle.js', newContent, err => {
    console.log(err);
  });
}

build();
