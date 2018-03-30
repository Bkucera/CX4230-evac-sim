import { assign } from 'lodash'
import { Bodies, Body, Vector } from "matter-js";
import { personColor } from './globals';

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

		// Start walking randomly every 90 ms, repeat forever
		setInterval(() => this.move(), 90)

	}

	move() {
		Body.applyForce(
			this.body,
			this.body.position,
			this.getRandomDirectionForce(),
		)
	}

	private getRandomDirectionForce() {
		return Vector.div(Vector.normalise(
			{ x: Math.random() - 0.5, y: Math.random() - 0.5 },
		),300/this.body.mass)
	}
}
