import { Bodies, Engine, Render, World } from "matter-js"

const start = () => {
	const engine = Engine.create()
	const render = Render.create({
		element: document.body,
		engine,
	})

	const boxA = Bodies.rectangle(400, 200, 80, 80)
	const boxB = Bodies.rectangle(400, 50, 80, 80)
	const ground = Bodies.rectangle(400, 610, 810, 60, {isStatic: true})

	World.add(engine.world, [boxA, boxB, ground])

	Engine.run(engine)
	Render.run(render)
}

export default {
	start,
}
