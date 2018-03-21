module.exports = async ({ gitignore }) => {
  if (!gitignore.lines.includes('package-lock.json')) {
    gitignore.lines.unshift('package-lock.json')
  }
  if (!gitignore.lines.find(line => line.match(/node_modules/))) {
    gitignore.lines.unshift('node_modules/')
  }

  return {
    postInit: async ({ log, task, shell }) => {
      // TODO: add badges to `readme` via badge-me
      await task('test', async () => {
        await task(`installing zenflow-lint-js`, async () => {
          await shell('npm install zenflow-lint-js')
          await shell('npx zenflow-lint-js setup')
          await shell('npm run fix')
        })
      })
    },
  }
}
