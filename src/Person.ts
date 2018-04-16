import { assign } from 'lodash'
import { Bodies, Body, Vector } from "matter-js";
import { w, h, personColor, personSize } from './globals';
import {exits, getZone} from './Mapper'
import Exit from './Exit';
import { exitedBuilding } from "./Spawner";

// Hardcoded defaultExits 
const wallThickness = 10
const roomLength = 25
const defaultExitWidth = 25
// const defaultExits = [
// 	Vector.create(w, h - wallThickness / 2),
// 	Vector.create(w, wallThickness / 2)
// ]
// const exits = Mapper.exits || defaultExits


/*

This file hold the logic for the "Person" consumer class

You should be able to do the following:
- Instantiate a Person, as a Circle Object
- Tell a person to move towards an exit
- Person should move toward exit until reached

Current behavior:
- Walks in random direction. Has no idea where an exit is.

*/
export default class Person {
	public name: string
	public id: number
	public initPosition: Vector = { x: 400, y: 400 }
	public body : Body
	public exit : Exit
	public responseTime: number = 0
	public speed: number
	public exitBehavior: object
	private timeout: any
	constructor(options: Partial<Person>) {
		assign(this, options)

		this.body = Bodies.circle(
			this.initPosition.x,
			this.initPosition.y,
			personSize,  // circle radius
			{
				frictionAir: 0.3,
				render: {
					fillStyle: personColor
			}	
			}
		)

		while (!this.waitUntilAlarmAck) {
			// Do nothing.
		}
		
		this.getExit()
		// Start walking randomly every 90 ms, repeat forever
		setTimeout(() => {
			this.timeout = setInterval(() => this.move(), 120)
		}, Math.random()*500);

	}

	private reachedExit() {
		if (this.exit.nextZone) {
			this.exit = this.exit.nextZone.exits[0]
		} else {
			this.exitBuilding()
		}
	}

	private exitBuilding() {
		exitedBuilding(this)
		clearInterval(this.timeout)
	}

	private move() {
		if (Vector.magnitude(Vector.sub(this.body.position, this.exit.position)) < 10) {
			this.reachedExit()
		}
		Body.applyForce(
			this.body,
			this.body.position,
			this.getExitDirectionForce(),
		)
	}

	/**
	 * Waits for person to respond to the alarm
	 * @return Returns true if the person is now responding to the alarm, false otherwise
	 */
	private waitUntilAlarmAck(): Boolean {
		// This is probably broken since we haven't sync'd sim time
		if (this.responseTime > 0) {
			this.responseTime--
		}
		return (this.responseTime < 0)
	}

	private getExit() {
		this.exit = getZone(this.body.position).exits[0]
		// Choose random exit using random int generator
		// (min is inclusive, max is exclusive)
  		// this.exit = exits[1]
	}

	private getExitDirectionForce() {
		let deltaX = this.exit.position.x - this.body.position.x
		let deltaY = this.exit.position.y - this.body.position.y
		return Vector.div(Vector.normalise({
			x: deltaX,
			y: deltaY,
		}), 100 / this.body.mass)
	}
}
