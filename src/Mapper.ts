import { Bodies, Engine, Render, World, Mouse, MouseConstraint, Constraint, Composite, Body, Vector } from "matter-js"
import Person, { } from "./Person";
import {h,w, wallColor} from './globals'
let engine
const createMap = (appEngine) => {
	engine = appEngine

	// add the walls on all four sides of the simulation
	const ground = [
		Bodies.rectangle(w / 2, h - 5, w, 10, { isStatic: true }),
		Bodies.rectangle(w / 2, 5, w, 10, { isStatic: true }),
		Bodies.rectangle(5, h/2, 10, h, { isStatic: true }),
		Bodies.rectangle(w-5, h/2, 10, h, { isStatic: true }),
	]
		ground.forEach(wall => wall.render.fillStyle = wallColor)

	// actually add them to the sim
	World.add(engine.world, [...ground])

	// spawn the People
	spawnPeople()


}

/**
 * This function is not what we want.
 * We to take in an Array of spawn locations : {x,y} and create a Person
 *   for each one at that location. Currently we are just spawning people
 *   randomly
 */
function spawnPeople(spawnLocations: Array<Vector> = null) {

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

export default {
	createMap,
}
