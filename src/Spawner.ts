import { Vector, World, Engine, Render } from "matter-js"
import Person from "./Person"
import { w, h, isNode, numPeople, personSize, exitWidth, multiBehavioral, maxResponseTime } from "./globals"
import { engine } from "./app"
import { stats } from "./stats"
import chalk from 'chalk'

const $ = isNode?null:require('jquery')

const $exitedCount = $?$('<div id="exited-count">No escapees</div>').appendTo($("body")):null
const $throughput = $?$("<div>throughput: 0 evac/sec</div>").appendTo($("body")):null

export const persons : Person[] = []
/**
 * Instantiate people objects
 */
const spawnPeople = (spawnLocations: Array<Vector> = null) => {
  const addPerson = () => {
    const person = new Person({
      initPosition: { // set random position
        x: 5 + Math.random() * (w - 10),
        y: 5 + Math.random() * (h - 10)
      }
    })
    // add to simulation engine
    persons.push(person)
    World.add(engine.world, [person.body])
  }

  for (let i = 0; i < numPeople; i++) {
    addPerson()
  }

  persons.forEach(person=>person.alert())
}

const start = () => {
  spawnPeople()
}

const printStats = () => {
  const statsString = chalk.green(
    `Simulation Completed\n` +
      chalk.blue("Stats:\n") +
      `
		Evacuated Count: ${chalk.white.bgBlack(stats.evacuatedCount + "")}
		Time Taken: ${chalk.white.bgBlack(stats.timestamp + " sec")}
		Throughput: ${chalk.white.bgBlack(stats.throughput + " evac/sec")}
    \n` +
    chalk.blue("Params for this run:"+
    `
    ${chalk.bgBlack.green('params.json')}:
    {
      "personSize": ${chalk.white.bgBlack(personSize)},
      "exitWidth": ${chalk.white.bgBlack(exitWidth)},
      "numPeople": ${chalk.white.bgBlack(numPeople)},
      "multiBehavioral": ${chalk.white.bgBlack(multiBehavioral)},
      "maxResponseTime": ${chalk.white.bgBlack(maxResponseTime)}
    }
    `)
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
