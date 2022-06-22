const rollup = require('rollup');
const { terser } = require('rollup-plugin-terser');
const constants = require('./constants');

const config = require('./rollup.config');

config.plugins.push(...[terser({ ecma: 5 })]);

const fs = require('fs');

fs.rmSync('./dist', { recursive: true, force: true });

async function build() {
  const { output: outputOption, ...inputOption } = config;
  const bundle = await rollup.rollup(inputOption);
  await bundle.generate(outputOption);
  await bundle.write(outputOption);
  const file = await fs.readFileSync('dist/bundle.js', 'utf-8');
  const newContent = file.replace(`"${constants.id}"`, `${constants.id}`);
  fs.writeFile('dist/bundle.js', newContent, err => {
    console.log(err);
  });
}

build();

module.exports = config;
