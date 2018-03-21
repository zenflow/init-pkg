const RealTimeFile = require('real-time-file')
const path = require('path')

module.exports = async ({ cwd }) => {
  const file = new RealTimeFile(path.join(cwd, '.gitignore'))
  const destroy = () => file.stop()
  await file.ready
  return {
    destroy,
    get text() {
      return file.text
    },
    set text(text) {
      file.text = text
    },
    get lines() {
      return file.lines
    },
    set lines(lines) {
      file.lines = lines
    },
  }
}
