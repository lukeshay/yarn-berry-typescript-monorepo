import * as fs from 'fs';
import { getPackage } from './common';

function generatePackage(name: string): string {
  const devDependencies = getPackage().devDependencies;

  return JSON.stringify({
    name: `@lukeshay/${name}`,
    version: '0.0.1',
    license: 'MIT',
    author: 'Luke Shay',
    input: 'src/index.ts',
    main: 'dist/index.js',
    module: 'dist/index.mjs',
    types: 'dist/types/index.d.ts',
    scripts: {
      prebuild: 'yarn clean',
      build: 'rollup --config',
      'build:debug': 'yarn build --debug',
      lint: "eslint 'src/**/*.ts{,x}'",
      format: 'yarn lint --fix',
      clean: 'rm -rf dist/ coverage/ test_output/ *.log',
      test: 'jest',
    },
    devDependencies,
  });
}

async function run(): Promise<number | null> {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    throw { message: 'You must provide the package name as the first argument.' };
  }

  const newPackage = `packages/${args[0]}`;

  if (!fs.existsSync(newPackage)) fs.mkdirSync(newPackage);

  fs.mkdirSync(`${newPackage}/src`);

  const pkgFile = generatePackage(args[0]);

  fs.writeFileSync(`${newPackage}/src/index.ts`, `export const PACKAGE = '@lukeshay/${args[0]}';`);
  fs.writeFileSync(`${newPackage}/package.json`, pkgFile);
  fs.writeFileSync(`${newPackage}/README.md`, `@lukeshay/${args[0]}`);
  fs.copyFileSync('configs/.eslintrc.js', `${newPackage}/.eslintrc.js`);
  fs.copyFileSync('configs/tsconfig.json5', `${newPackage}/tsconfig.json5`);
  fs.copyFileSync('configs/rollup.config.js', `${newPackage}/rollup.config.js`);
  fs.copyFileSync('configs/jest.config.js', `${newPackage}/jest.config.js`);

  return 0;
}

run()
  .then((value) => process.exit(value || 0))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
