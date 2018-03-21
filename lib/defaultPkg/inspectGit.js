const { simpleShell } = require('../utils')

const normalizeUrl = url => url.replace(/^git\+/, '').replace(/\.git$/, '')

module.exports = async ({ cwd }) => {
  const [url, userName, userEmail] = await Promise.all(
    [
      'git remote get-url origin',
      'git config user.name',
      'git config user.email',
    ].map(cmd => simpleShell(cwd, cmd)),
  )
  return {
    url: normalizeUrl(url),
    userName,
    userEmail,
  }
}
