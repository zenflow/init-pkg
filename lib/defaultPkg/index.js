const inspectGit = require('./inspectGit')

module.exports = async ({ cwd, readme, license, gitignore }) => {
  const git = await inspectGit({ cwd })
  return {
    name: readme.title,
    description: readme.subtitle,
    version: '1.0.0',
    repository: {
      type: 'git',
      url: `git+${git.url}.git`,
    },
    author: {
      name: git.userName,
      email: git.userEmail,
    },
    license: license.license,
    bugs: {
      url: `${git.url}/issues`,
    },
    homepage: `${git.url}#readme`,
    // TODO: pkg fields: keywords, scripts
  }
}
