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
	  this.exits.push(
		new Exit({
		  position: Vector.create(this.position.x + this.w,this.position.y + this.h / 2),
		  length: 0,
		  width: exitWidth,
		  nextZone: this.nextZone,
		})
	  )
	  exits.push(...this.exits)
	  this.createWalls()
	}

	private createWalls() {
	  const h = this.h
	  const w = this.w
	  const x = this.position.x
	  const y = this.position.y
	  const exitWidth = this.exitWidth
	  const walls = [
		Bodies.rectangle(x+w/2, y+wallThickness/2, w, wallThickness, {
		  isStatic: true
		}),
		Bodies.rectangle(x, y+h-wallThickness/2, 2 * w, wallThickness, {
		  isStatic: true
		}),
		Bodies.rectangle(wallThickness / 2, h / 2, wallThickness, h, {
		  isStatic: true
		}),
		Bodies.rectangle(
		  x + w - wallThickness / 2,
		  y + h / 4 - exitWidth / 2,
		  wallThickness,
		  h / 2 - exitWidth,
		  { isStatic: true }
		),
		Bodies.rectangle(
		  x + w - wallThickness / 2,
		  y + h * 3 / 4 + exitWidth / 2,
		  wallThickness,
		  h / 2 - exitWidth,
		  { isStatic: true }
		)
		// Bodies.rectangle(w / 2, wallThickness, wallThickness, h / 2 - defaultExitWidth / 2, { isStatic: true }),
		// Bodies.rectangle(w / 2, h + defaultExitWidth / 2, wallThickness, h / 2, { isStatic: true }),
	  ]
	  walls.forEach(wall => (wall.render.fillStyle = wallColor))
	  World.add(engine.world, [...walls])

	}
  }
  
export let exits:Exit[] = []

let zones: Zone[];

const createDefaultMap = () => {

const outer = new Zone({})
const inner1 = new Zone({
	position: {x:0, y:h/2},
	w: w/2,
	h: h/2,
	nextZone:outer,
	})
const inner2 = new Zone ({
	position: {x:0,y:0},
	w: w/3,
	h:h/3,
	nextZone: outer
})


zones = [
	outer,
	inner1,
	inner2,
]
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
	// console.log(zones)
	zones.forEach((zone,i)=> {
		if (position.x > zone.position.x+wallThickness/2
			&& position.x < zone.position.x + zone.w - wallThickness/2
			&& position.y > zone.position.y + wallThickness/2
			&& position.y < zone.position.y +zone.h - wallThickness/2
			) {
				if (i === 3) {
					console.log("in zone 3")
				}
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

