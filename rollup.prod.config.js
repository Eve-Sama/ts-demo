const { terser } = require('rollup-plugin-terser');

const config = require('./rollup.config');

config.plugins.push(terser({ ecma: 5 }));

module.exports = config;
