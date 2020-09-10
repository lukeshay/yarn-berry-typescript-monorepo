# Yarn Berry TypeScript Monorepo Template

This repo is a template for creating a monorepo that uses TypeScript, Jest, and RollupJS. These are the tools I gravitate towards so I decided I would make a template. If anybody finds any bugs, you can submit and issue or create a PR and I will review it. The TypeScript and ESLint configs are setup for Node projects but can easily be modified for browser projects.

I will continue to add new scripts to this repository as I create useful ones.

## Getting Started

There is a command in the `package.json` that will do the setup for you, but this section will also run you through how to do it manually. The command to setup the repo is:

```bash
yarn setup
```

To setup the repo for yourself, run the following command:

```bash
yarn policies set-version berry && yarn set version berry
```

You will now have Yarn Berry (Yarn 2) setup for this directory. Next you will need to install the plugins and other dependencies. To install the plugins run this command:

```bash
yarn install
```

To install the dependencies, run the following command:

```bash
yarn
```

You now have this repo setup!

## Creating a New Package

Generally this is a very manual process, but since most of the time the packages all need the same configuration in a monorepo, I built a script that will create a new package in the packages directory. In order to create a new package, run the following command in the root of the repository:

```bash
yarn new-package <package-name>
```

Replace `<package-name>` with the name of your package. The script that this command runs can be found in `packages/scripts/src/new-package.ts`. The following are the steps this scripts takes:

1. Creates the directory in the `packages` directory with the name you supplied
1. Creates the `src` directory
1. Creates `src/index.ts`
1. Creates the `package.json` file
1. Creates the `README.md` file
1. Copies all the config files from `configs`
