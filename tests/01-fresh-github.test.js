/* eslint-env jest */

const path = require('path')
const tempy = require('tempy')
const recursiveCopy = require('recursive-copy')
const execa = require('execa')
const initPkg = require('../lib/initPkg')
const { readFile } = require('../lib/utils')

const readJson = file => readFile(file).then(str => JSON.parse(str))

describe('basic', () => {
  test('fresh-github', async () => {
    const tempDir = tempy.directory()
    await recursiveCopy(
      path.join(__dirname, 'fixtures', 'fresh-github'),
      tempDir,
      { dot: true },
    )
    await execa.shell(
      `git init && git remote add origin https://github.com/foo/bar.git`,
      { cwd: tempDir },
    )
    await initPkg({ log: console.log, cwd: tempDir })
    const pkg = await readJson(path.join(tempDir, 'package.json'))
    const pkgNoAuthor = Object.assign({}, pkg, { author: false })
    expect(pkgNoAuthor).toEqual({
      name: 'fresh-github',
      description: 'some words describing fresh-github',
      version: '1.0.0',
      repository: {
        type: 'git',
        url: 'git+https://github.com/foo/bar.git',
      },
      license: 'MIT',
      bugs: {
        url: 'https://github.com/foo/bar/issues',
      },
      homepage: 'https://github.com/foo/bar#readme',
      author: false,
    })
  })
})
