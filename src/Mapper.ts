import { Bodies, Engine, Render, World, Mouse, MouseConstraint, Constraint, Composite, Body, Vector } from "matter-js"
import Person, { } from "./Person";
import Spawner from "./Spawner";
import { h, w, wallColor } from './globals'
import { engine } from "./app";

const createMap = () => {

	// add the walls on all four sides of the simulation
	const walls = [
		Bodies.rectangle(w / 2, h - 5, w, 10, { isStatic: true }),
		Bodies.rectangle(w / 2, 5, w, 10, { isStatic: true }),
		Bodies.rectangle(5, h/2, 10, h, { isStatic: true }),
		Bodies.rectangle(w-5, h/2, 10, h, { isStatic: true }),
	]
		walls.forEach(wall => wall.render.fillStyle = wallColor)

	// actually add them to the sim
	World.add(engine.world, [...walls])

	// spawn the People
	Spawner.start()

}

export default {
	createMap,
}
