import { Vector, World } from "matter-js";
import Person from "./Person";
import { w, h } from "./globals";
import { engine } from "./app";
import { stats } from "./stats";
import * as $ from 'jquery';

const $exitedCount = $('<div id="exited-count">No escapees</div>').appendTo($('body'))

/**
 * This function is not what we want.
 * We want to take in an Array of spawn locations : {x,y} and create a Person
 *   for each one at that location. Currently we are just spawning people
 *   randomly
 */
const spawnPeople = (spawnLocations: Array<Vector> = null) => {

	const addPerson = () => {
		const person = new Person({
			initPosition: {x: 5+Math.random()*(w-10), y: 5+Math.random()*(h-10)}
		})
		World.add(engine.world, [person.body])	
	}

	for (let i = 0; i<80; i++) {
		addPerson()
	}
}

const start = () => {
	
	spawnPeople()
}

export const exitedBuilding = (person : Person) => {
	World.remove(engine.world, person.body)
	stats.evacuatedCount++
	$exitedCount.text(`Evacuated Count: ${stats.evacuatedCount}`)
}



export default {start}