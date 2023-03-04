# vue-tsc-files

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/gustavopch/tsc-files/Release?style=flat-square)

一个轻量级工具，可以在给具体文件运行 `tsc` 时不忽略 `tsconfig.json` 文件。


[English](./README.md) | 简体中文


## 关于 vue-tsc-files
借鉴了 [gustavopch/tsc-files](https://github.com/gustavopch/tsc-files), 并使其支持校验Vue中的TS类型。

## 安装

```sh
npm i -D vue-tsc-files
```

```sh
yarn add -D vue-tsc-files
```

## 为什么

仅希望通过[lint-staged](https://github.com/okonet/lint-staged)对 **暂存区文件** 进行TS校验。

如果你像这样 `tsc --noEmit file1.ts file2.ts` 传递文件， TypeScript 将忽略 `tsconfig.json` 文件。

这里已经有一个开启中的 TypeScript 问题 — 您可能需要 👍 那里: https://github.com/microsoft/TypeScript/issues/27379

## 使用

配合lint-staged一起使用:

```json
{
  "lint-staged": {
    "*.{vue,ts}": "vue-tsc-files --noEmit"
  }
}
```

vue-tsc-files 会自动将根目录和src目录下的d.ts文件包含在内，如果你有更多的全局类型文件，请手动将他加在  `lint-staged.config.js` 文件中：

```js
const declarationFiles = ['src/global.d.ts', 'src/shims-vue.d.ts']

module.exports = {
  '*.{vue,ts}': (filenames) => {
    const files = [...filenames, ...declarationFiles]
    return `vue-tsc-files ${files.join(' ')} --noEmit --skipLibCheck`
  },
}
```

## 如何工作的

在大多数情况下，它只是将所有参数转发到`tsc`，但有一个例外：指定的文件不会被转发，而是将它们放在临时配置的`files`属性中，该临时配置将在原始`tsconfig.json`旁边生成。除此之外，只需阅读`tsc-help`即可。

## 许可证

[MIT License](./LICENSE.md).
