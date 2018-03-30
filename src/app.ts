import { Bodies, Engine, Render, World, Mouse, MouseConstraint, Constraint, Composite, Body } from "matter-js"

import Mapper from './Mapper'
import { w, h } from './globals'

export let engine
export const start = () => {

	// create the simulation objects
	engine = Engine.create()
	const render = Render.create({
		element: document.body,
		engine,
		options: {
			height: h,
			width: w,
			wireframes:false,
		},
	})

	// start the simulation
	Engine.run(engine)
	Render.run(render)

	// add mouse interaction
	const mouse = Mouse.create(render.canvas);
	const mouseConstraint = MouseConstraint.create(engine, {
		constraint: {
			render: {
				visible: false,
			},
			stiffness: 0.9,
		} as Constraint,
		mouse,
	})
	World.add(engine.world, mouseConstraint)
	render.mouse = mouse

	// disable gravity (duh)
	engine.world.gravity.y = 0	

	// pass off work to Mapper
	Mapper.createMap()
}