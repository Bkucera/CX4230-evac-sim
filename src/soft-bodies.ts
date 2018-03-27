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



export default start
// Example.softBody = function() {
//     var Engine = Matter.Engine,
//         Render = Matter.Render,
//         Runner = Matter.Runner,
//         Composites = Matter.Composites,
//         MouseConstraint = Matter.MouseConstraint,
//         Mouse = Matter.Mouse,
//         World = Matter.World,
//         Bodies = Matter.Bodies;

//     // create engine
//     var engine = Engine.create(),
//         world = engine.world;

//     // create renderer
//     var render = Render.create({
//         element: document.body,
//         engine: engine,
//         options: {
//             width: 800,
//             height: 600,
//             showAngleIndicator: false
//         }
//     });

//     Render.run(render);

//     // create runner
//     var runner = Runner.create();
//     Runner.run(runner, engine);

//     // add bodies
//     var particleOptions = {
//         friction: 0.05,
//         frictionStatic: 0.1,
//         render: { visible: true }
//     };

//     World.add(world, [
//         Composites.softBody(250, 100, 5, 5, 0, 0, true, 18, particleOptions),
//         Composites.softBody(400, 300, 8, 3, 0, 0, true, 15, particleOptions),
//         Composites.softBody(250, 400, 4, 4, 0, 0, true, 15, particleOptions),
//         // walls
//         Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
//         Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
//         Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
//         Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
//     ]);

//     // add mouse control
//     var mouse = Mouse.create(render.canvas),
//         mouseConstraint = MouseConstraint.create(engine, {
//             mouse: mouse,
//             constraint: {
//                 stiffness: 0.9,
//                 render: {
//                     visible: false
//                 }
//             }
//         });

//     World.add(world, mouseConstraint);

//     // keep the mouse in sync with rendering
//     render.mouse = mouse;

//     // fit the render viewport to the scene
//     Render.lookAt(render, {
//         min: { x: 0, y: 0 },
//         max: { x: 800, y: 600 }
//     });

//     // context for MatterTools.Demo
//     return {
//         engine: engine,
//         runner: runner,
//         render: render,
//         canvas: render.canvas,
//         stop: function() {
//             Matter.Render.stop(render);
//             Matter.Runner.stop(runner);
//         }
//     };
// };
