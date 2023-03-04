# vue-tsc-files

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/gustavopch/tsc-files/Release?style=flat-square)

A tiny tool to run `tsc` on specific files without ignoring `tsconfig.json`.


English | [简体中文](./README.zh-CN.md)


## About vue-tsc-files
Fork from [gustavopch/tsc-files](https://github.com/gustavopch/tsc-files), and support the Typescript in Vue.

## Installation

```sh
npm i -D vue-tsc-files
```

```sh
yarn add -D vue-tsc-files
```

## Why

I wanted to type-check **only the staged files** with [lint-staged](https://github.com/okonet/lint-staged).

Unfortunately passing specific files like `tsc --noEmit file1.ts file2.ts` will cause TypeScript to simply ignore your `tsconfig.json`.

There's already an open issue in the TypeScript repo to support this use case — you may want to give a 👍 there: https://github.com/microsoft/TypeScript/issues/27379

## Usage

With lint-staged:

```json
{
  "lint-staged": {
    "*.{vue,ts}": "vue-tsc-files --noEmit"
  }
}
```

Vue-tsc-files can auto search d.ts from root or src dir. If you have more, you can add there in `lint-staged.config.js`

```js
const declarationFiles = ['src/global.d.ts', 'src/shims-vue.d.ts']

module.exports = {
  '*.{vue,ts}': (filenames) => {
    const files = [...filenames, ...declarationFiles]
    return `vue-tsc-files ${files.join(' ')} --noEmit --skipLibCheck`
  },
}
```

## How it works

For the most part, it just forwards all arguments to `tsc` with one exception: the specified files will not be forwarded — instead, they will be put at the `files` property of a temporary config that will be generated next to your original `tsconfig.json`. Other than that, just read `tsc --help`.

## License

Released under the [MIT License](./LICENSE.md).
