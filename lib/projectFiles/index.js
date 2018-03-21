const getGitignore = require('./gitignore')
const getReadme = require('./readme')
const getLicense = require('./license')

module.exports = async ({ cwd }) => {
  const [gitignore, readme, license] = await Promise.all(
    [getGitignore, getReadme, getLicense].map(fn => fn({ cwd })),
  )
  return {
    gitignore,
    readme,
    license,
  }
}
