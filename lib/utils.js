const { dirname, join } = require('path')
const fs = require('fs')

const randomChars = () => {
  return Math.random().toString(36).slice(2)
}

const resolveFromModule = (moduleName, ...paths) => {
  const modulePath = dirname(require.resolve(`${moduleName}/package.json`))
  return join(modulePath, ...paths)
}

const resolveFromRoot = (...paths) => {
  return join(process.cwd(), ...paths)
}

const searchDtsFiles = dir => {
  return fs.readdirSync(dir).flatMap(file => {
    if (/\.d\.ts$/.test(file)) return [`${dir}/${file}`]
    if (/src$/.test(file)) return searchDtsFiles(`${dir}/${file}`)
    return []
  })
}

module.exports = {
  randomChars,
  resolveFromModule,
  resolveFromRoot,
  searchDtsFiles,
}
