#!/usr/bin/env node

const minimist = require('minimist')
const initPkg = require('./lib/initPkg')

initPkg({
  log: console.log,
  cwd: process.cwd(),
  args: Object.assign(
    {
      /* options */
    },
    minimist(process.argv.slice(2)),
  ),
}).catch(error => {
  console.error(error)
  process.exit(1)
})
