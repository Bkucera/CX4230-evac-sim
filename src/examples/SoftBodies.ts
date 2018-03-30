import {
	Bodies, Composite, Composites, Constraint, Engine,  IMouseConstraintDefinition, Mouse,
	MouseConstraint, Render, Runner, World,
} from "matter-js";

function start() {
	const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
	const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
	const engine = Engine.create();
	const world = engine.world;
	const render = Render.create({
		element: document.body,
		engine,
		options: {
			height: h,
			width: w,
		},
	});
	Render.run(render);
	const runner = Runner.create({});
	Runner.run(runner, engine);
	const particleOptions = {
		friction: 0.05,
		frictionStatic: 0.1,
		render: { visible: true },
	};
	World.add(world, [
		Composites.softBody(250, 100, 5, 5, 0, 0, true, 18, particleOptions, {}),
		Composites.softBody(400, 300, 8, 3, 0, 0, true, 15, particleOptions, {}),
		Composites.softBody(250, 400, 4, 4, 0, 0, true, 15, particleOptions, {}),
		// walls
		Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
		Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
		Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
		Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
	]); // bad type defs
	const mouse = Mouse.create(render.canvas);
	const mouseConstraint = MouseConstraint.create(engine, {
		constraint: {
			render: {
				visible: false,
			},
			stiffness: 0.9,
		} as Constraint,
		mouse,
	});
	World.add(world, mouseConstraint);
	render.mouse = mouse;
	Render.lookAt(render, {
		min: { x: 0, y: 0 },
		max: { x: 800, y: 600 },
	});
}



export default {
	start,
}
