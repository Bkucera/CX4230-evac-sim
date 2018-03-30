import { Vector, World } from "matter-js";
import Person from "./Person";
import { w, h } from "./globals";
import { engine } from "./app";



/**
 * This function is not what we want.
 * We want to take in an Array of spawn locations : {x,y} and create a Person
 *   for each one at that location. Currently we are just spawning people
 *   randomly
 */
const spawnPeople = (spawnLocations: Array<Vector> = null) => {

	const addPerson = () => {
		const person = new Person({
			initPosition: {x: Math.random()*w, y: Math.random()*h}
		})
		World.add(engine.world, [person.body])	
	}

	for (let i = 0; i<20; i++) {
		addPerson()
	}
}

const start = () => {
	
	spawnPeople()
}



export default {start}