import * as fs from "fs-extra"
import { exec } from "child_process"
import * as Promise from "bluebird"
import * as sh from 'shelljs'

export const deploy = (
  gh_name: string,
  gh_email: string,
  temp_folder: string,
  dest_folder: string
) => {
  if (!sh.which('git')) {
    sh.echo('Git not installed')
    sh.exit(1)
  }
  sh.exec('npm run build')
  sh.cp('-r', 'dist', temp_folder)
  sh.exec(`git checkout gh-pages`)
  sh.cp('-r', temp_folder, dest_folder)
  sh.exec(`git add ${dest_folder}`)
  sh.exec(`git commit -m "Deploy ${dest_folder}"`)
  sh.exec('git push origin gh-pages')
}

deploy("bkucera", "benkucera@gmail.com", "tmp", "branch-12345")
