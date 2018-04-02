import { Bodies, Engine, Render, World, Mouse, MouseConstraint, Constraint, Composite, Body, Vector } from "matter-js"
import Person, { } from "./Person";
import Exit, { } from "./Exit";
import Spawner from "./Spawner";
import { h, w, wallColor, defaultExitWidth } from './globals'
import { engine } from "./app";

const wallThickness = 10
const roomLength = 25

const createDefaultMap = () => {
	// add the walls on all four sides of the simulation
	const walls = [
		Bodies.rectangle(0, h - wallThickness / 2, 2 * w - 4 * defaultExitWidth, wallThickness, { isStatic: true }),
		Bodies.rectangle(0, wallThickness / 2, 2 * w - 4 * defaultExitWidth, wallThickness, { isStatic: true }),
		Bodies.rectangle(wallThickness / 2, h/2, wallThickness, h, { isStatic: true }),
		Bodies.rectangle(w - wallThickness / 2, h/2, wallThickness, h, { isStatic: true }),
		Bodies.rectangle(w / 2, wallThickness, wallThickness, h / 2 - defaultExitWidth / 2, { isStatic: true }),
		Bodies.rectangle(w / 2, h + defaultExitWidth / 2, wallThickness, h / 2, { isStatic: true }),
	]
		walls.forEach(wall => wall.render.fillStyle = wallColor)

	const obstacles = [
		Bodies.rectangle(w / 2 + 5 * wallThickness, h / 2, wallThickness, h / 2, { isStatic: true })
	]
	obstacles.forEach(wall => wall.render.fillStyle = wallColor)

	// actually add them to the sim
	World.add(engine.world, [...walls])
	World.add(engine.world, [...obstacles])

	// spawn the People
	Spawner.start()
}

const defaultExits = [
	new Exit(Vector.create(2 * w - 4 * defaultExitWidth, h - wallThickness / 2), 0, 4 * defaultExitWidth),
	new Exit(Vector.create(2 * w - 4 * defaultExitWidth, wallThickness / 2), 0, 4 * defaultExitWidth)
]

const createMap = (exitLocations: Array<Vector> = null,
					obstacleLocations: Array<Vector> = null) => {
	// TODO
}

export default {
	createDefaultMap,
	defaultExits,
	createMap,
}
