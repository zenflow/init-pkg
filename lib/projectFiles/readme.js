const RealTimeFile = require('real-time-file')
const path = require('path')

const notBlank = str => str.trim() !== ''

module.exports = async ({ cwd }) => {
  const file = new RealTimeFile(path.join(cwd, 'README.md'))
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
    get title() {
      return file.lines
        .find(notBlank)
        .replace(/^#* /, '')
        .trim()
    },
    get subtitle() {
      const titleIndex = file.lines.findIndex(notBlank)
      return file.lines
        .slice(titleIndex + 1)
        .find(notBlank)
        .replace(/^#* /, '')
        .trim()
    },
  }
}
