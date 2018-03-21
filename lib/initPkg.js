const findUp = require('find-up')
const path = require('path')
const { myShell, logWrapTask, writeJson } = require('./utils')
const getDefaultPkg = require('./defaultPkg/index')
const getProjectFiles = require('./projectFiles/index')

async function initPkg({ log, cwd, args }) {
  log = log.bind(null, 'init-pkg:')
  const task = logWrapTask.bind(null, log)
  // const shell = myShell.bind(null, log, cwd)

  const { readme, license, gitignore } = await getProjectFiles({ cwd })
  const pkg = await getDefaultPkg({ cwd, readme, license, gitignore })

  const userConfig = await task('getting configuration', async () => {
    const configPath = await findUp('init-pkg.config.js', { cwd })
    return configPath
      ? require(configPath)({ cwd, readme, license, gitignore, pkg })
      : {}
  })

  await task(
    'writing package.json',
    writeJson(path.join(cwd, 'package.json'), pkg),
  )

  if (userConfig.postInit) {
    const userLog = log.bind(null, 'postInit:')
    await userConfig.postInit({
      log: userLog,
      task: logWrapTask.bind(null, userLog),
      shell: myShell.bind(null, userLog, cwd),
    })
  }

  gitignore.destroy()
  readme.destroy()
  license.destroy()
  log('done')
}

module.exports = initPkg
