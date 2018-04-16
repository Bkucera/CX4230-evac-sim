import {
  Bodies,
  Engine,
  Render,
  World,
  Mouse,
  MouseConstraint,
  Constraint,
  Composite,
  Body,
  Vector
} from "matter-js"
import Person from "./Person"
import Exit from "./Exit"
import Hazard from "./Hazard"
import Spawner from "./Spawner"
import { h, w, wallColor, exitWidth } from "./globals"
import { engine } from "./app"
import { assign } from "lodash"

const wallThickness = 10
const roomLength = 25

export class Zone {
	public position: Vector = { x: 0, y: 0 } // top left corner of zone
	public exitWidth: number = exitWidth
	public h: number = h
	public w: number = w
	public nextZone:Zone = null
	public exits: Exit[] = []
  
	constructor(params: Partial<Zone>) {
	  assign(this, params)
	  this.createWalls()
	}

	private createWalls() {
	  const h = this.h
	  const w = this.w
	  const exitWidth = this.exitWidth
	  const walls = [
		Bodies.rectangle(0, h - wallThickness / 2, 2 * w, wallThickness, {
		  isStatic: true
		}),
		Bodies.rectangle(0, wallThickness / 2, 2 * w, wallThickness, {
		  isStatic: true
		}),
		Bodies.rectangle(wallThickness / 2, h / 2, wallThickness, h, {
		  isStatic: true
		}),
		Bodies.rectangle(
		  w - wallThickness / 2,
		  h / 4 - exitWidth / 2,
		  wallThickness,
		  h / 2 - exitWidth,
		  { isStatic: true }
		),
		Bodies.rectangle(
		  w - wallThickness / 2,
		  h * 3 / 4 + exitWidth / 2,
		  wallThickness,
		  h / 2 - exitWidth,
		  { isStatic: true }
		)
		// Bodies.rectangle(w / 2, wallThickness, wallThickness, h / 2 - defaultExitWidth / 2, { isStatic: true }),
		// Bodies.rectangle(w / 2, h + defaultExitWidth / 2, wallThickness, h / 2, { isStatic: true }),
	  ]
	  walls.forEach(wall => (wall.render.fillStyle = wallColor))
	  World.add(engine.world, [...walls])
	  this.exits.push(
		new Exit({
		  position: Vector.create(w, h / 2),
		  length: 0,
		  width: exitWidth,
		  nextZone: this.nextZone,
		})
	  )
	}
  }
  
export let exits:Exit[] = []

let zones: Zone[];

const createDefaultMap = () => {

const outer = new Zone({})
const inner1 = new Zone({
	position: {x:w/2, y:h/2},
	w: w/2,
	h: h/2,
	nextZone:outer,
	})
zones = [
	outer,
	inner1,
]

	exits.push(
		...outer.exits,
		...inner1.exits,
	)
  // add the walls on all four sides of the simulation
  
//   const obstacles = [
    // Bodies.rectangle(w / 2 + 5 * wallThickness, h/3*2, wallThickness, wallThickness, { isStatic: true })
//   ]
//   obstacles.forEach(wall => (wall.render.fillStyle = wallColor))
  // actually add them to the sim
//   World.add(engine.world, [...obstacles])

  // spawn the People
  Spawner.start()
}

export const getZone = (position:Vector):Zone => {
	zones = zones.sort((a,b) => b.h*b.w - a.h * a.w)
	let inZone = zones[0];
	console.log(zones)
	zones.forEach(zone=> {
		if (position.x > zone.position.x -zone.w
			&& position.x < zone.position.x 
			&& position.y > zone.position.y - zone.h
			&& position.y < zone.position.y 
			) {
				console.log('in zone ' + zone.w)
				inZone = zone
			}
	})
	return inZone
}


const defaultObstacles = [
  new Hazard(
    Vector.create(w / 2 + 5 * wallThickness, h / 2),
    wallThickness,
    h / 2
  )
]

const createMap = (
  exitLocations: Array<Vector> = null,
  obstacleLocations: Array<Vector> = null
) => {
  // TODO
}

export default {
  createDefaultMap,
  defaultObstacles,
  createMap
}

