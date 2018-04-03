import { assign } from 'lodash'
import { Bodies, Body, Vector } from "matter-js";
import { w, h, personColor } from './globals';
//import { defaultExits } from './Mapper';

// Hardcoded defaultExits 
const wallThickness = 10
const roomLength = 25
const defaultExitWidth = 25
const defaultExits = [
		Vector.create(2 * w - 4 * defaultExitWidth, h - wallThickness / 2),
		Vector.create(2 * w - 4 * defaultExitWidth, wallThickness / 2)
	]

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
	public exit: Vector
	public responseTime: number = 0
	public speed: number
	public exitBehavior: object
	constructor(options: Partial<Person>) {
		assign(this, options)

		this.body = Bodies.circle(
			this.initPosition.x,
			this.initPosition.y,
			6,  // circle radius
			{
				frictionAir: 0.1,
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
		setInterval(() => this.move(), 90)

	}

	move() {
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
		// Choose random exit using random int generator
		// (min is inclusive, max is exclusive)
		let min = Math.ceil(0)
  		let max = Math.floor(defaultExits.length)
  		this.exit = defaultExits[Math.floor(Math.random() * (max - min)) + min]
	}

	private getExitDirectionForce() {
		let deltaX = this.exit.x - this.body.position.x
		let deltaY = this.exit.y - this.body.position.y
		return Vector.div(Vector.normalise({
			x: deltaX,
			y: deltaY,
		}), 300 / this.body.mass)
	}
}
