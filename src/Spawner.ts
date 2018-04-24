import { Vector, World, Engine, Render } from "matter-js"
import Person from "./Person"
import { w, h, isNode } from "./globals"
import { engine } from "./app"
import { stats } from "./stats"
import chalk from "chalk"

const $ = isNode?null:require('jquery')

const $exitedCount = $?$('<div id="exited-count">No escapees</div>').appendTo($("body")):null
const $throughput = $?$("<div>throughput: 0 evac/sec</div>").appendTo($("body")):null
const numPeople = 25
/**
 * This function is not what we want.
 * We want to take in an Array of spawn locations : {x,y} and create a Person
 *   for each one at that location. Currently we are just spawning people
 *   randomly
 */
const spawnPeople = (spawnLocations: Array<Vector> = null) => {
  const addPerson = () => {
    const person = new Person({
      initPosition: {
        x: 5 + Math.random() * (w - 10),
        y: 5 + Math.random() * (h - 10)
      }
    })
    World.add(engine.world, [person.body])
  }

  for (let i = 0; i < numPeople; i++) {
    addPerson()
  }
}

const start = () => {
  spawnPeople()
}

const printStats = () => {
  const statsString = chalk.green(
    `Simulation Completed\n` +
      chalk.blue("Stats:\n") +
      `
		Evacuated Count: ${chalk.white(stats.evacuatedCount + "")}
		Time Taken: ${chalk.white(stats.timestamp + " sec")}
		Throughput: ${chalk.white(stats.throughput + " evac/sec")}
		`
  )

  $?$(`<pre>${statsString}</pre>`).appendTo($("body")):console.log(statsString)
  $?null:process.exit(0)
}

export const exitedBuilding = (person: Person) => {
  World.remove(engine.world, person.body)
  stats.evacuatedCount++
  stats.throughput =
    Math.round(stats.evacuatedCount * 100 / (engine.timing.timestamp / 1000)) /
    100
  $?$exitedCount.text(`Evacuated Count: ${stats.evacuatedCount}`):console.log(`Evacuated Count: ${stats.evacuatedCount}`)
  $?$throughput.text(`throughput: ${stats.throughput} evac/sec`):console.log(`Throughput: ${stats.throughput}`)
  if (stats.evacuatedCount === numPeople) {
    printStats()
  }
}

export default { start }
