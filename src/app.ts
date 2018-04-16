import { Bodies, Engine, Render, World, Mouse, MouseConstraint, Constraint, Composite, Body } from "matter-js"

import Mapper from './Mapper'
import { w, h } from './globals'
import * as $ from 'jquery'
import { stats } from "./stats";
export let engine

const $timestamp = $(`<div>timestamp:0</div>`).appendTo($('body'))

let headless = true

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
	Render.run(render)

	// start the simulation
	Engine.run(engine)

	console.log(engine.timing)
	engine.timing.timeScale = 1
	setInterval(() => {
		stats.timestamp = Math.round(engine.timing.timestamp/10)/100
		$timestamp.text(`timestamp: ${stats.timestamp}`)
	}, 100);
	window['engine'] = engine
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
	Mapper.createDefaultMap()
}