import * as fs from 'fs-extra'

fs.removeSync('./docs')
fs.copySync('./dist', './docs')

console.log('Ready to deploy')
