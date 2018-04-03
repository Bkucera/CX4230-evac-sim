import * as fs from "fs-extra"
import { exec } from "child_process"
import * as Promise from "bluebird"

export const deploy = (
  gh_name: string,
  gh_email: string,
  temp_folder: string,
  dest_folder: string
) => {
  const execAsync = Promise.promisify(exec)
  execAsync("npm run build")
    .then(() => fs.copySync("./dist", temp_folder))
    .then(() => execAsync("git checkout `gh-pages`"))
    .then(() => fs.copySync(temp_folder, dest_folder))
    .then(()=> execAsync(`git add .`))
    .then(() => execAsync(`git status`))
    .then(console.log)    
    .then(()=> execAsync("git push origin HEAD"))
    .then(console.log)
    .then(console.log('success!'))
}
