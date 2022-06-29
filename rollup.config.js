import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import child_process from 'child_process';

const config = {
  input: './src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  plugins: [
    commonjs(),
    typescript(),
    {
      name: 'conditional-exec',
      writeBundle: async outputOptions => {
        console.clear();
        const ex = child_process.exec(`node ${outputOptions.file}`, { stdio: 'inherit', env: { ...process.env, NODE_ENV: 'development' } });

        ex.stdout.pipe(process.stdout);
      },
    },
  ],
  external: ['axios'],
};

export default config;
