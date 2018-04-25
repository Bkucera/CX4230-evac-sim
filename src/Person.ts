import { assign } from 'lodash'
import { Bodies, Body, Vector } from "matter-js";
import { w, h, personColor, personSize, exitWidth, multiBehavioral, maxResponseTime } from './globals';
import Mapper, { exits, getZone } from './Mapper'
import Exit from './Exit';
import Spawner, { exitedBuilding, persons } from "./Spawner";
import { dirname } from 'path';

// Hardcoded defaultExits 
const wallThickness = 10
const roomLength = 25

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
	private following:Vector[] = null
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
		// Move towards an exit

	}

	public alert() {
		if (multiBehavioral) this.chooseBehavoir()

		setTimeout(() => {
			this.startMove()
		}, Math.random()*maxResponseTime);
	}

	private chooseBehavoir() {
		if (Math.random() < .4) {
			// is a follower
			this.following = []
			persons.forEach(person=> {
				if (person.exit === this.exit) {
					this.following.push(person.body.position)
				}
			})
		}
	}

	public startMove() {
		setTimeout(() => {
			this.timeout = setInterval(() => this.move(), 120)
		}, Math.random()*200);
	}

	/**
	 * Check whether exit has been reached and if so, exit
	 */
	private reachedExit() {
		if (this.exit.nextZone) {
			this.exit = this.exit.nextZone.exits[0]
		} else {
			this.exitBuilding()
		}
	}

	/**
	 * Exit building handler
	 */
	private exitBuilding() {
		exitedBuilding(this)
		clearInterval(this.timeout)
	}

	private move() {
		const distanceToExit = {
			x: Math.abs(this.body.position.x-this.exit.position.x),
			y: Math.abs(this.body.position.y-this.exit.position.y),
		}
		if ( distanceToExit.x < 10 && distanceToExit.y < exitWidth) {
			this.reachedExit()
		}

		const closeToExit = (distanceToExit.x + distanceToExit.y) < 40
		const gotoExit = !this.following || closeToExit

		Body.applyForce(
			this.body,
			this.body.position,
			this.getDirectionForceTo(gotoExit?this.exit.position:this.getAvgFollowing()),
		)
	}

	private getAvgFollowing() {
		let sumVector = {x:0, y:0}
		this.following.forEach(position => {
			sumVector = Vector.add(sumVector, position)
		})
		const direction = Vector.div(sumVector, this.following.length)
		return direction
	}

	/**
	 * Waits for person to respond to the alarm
	 * @return Returns true if the person is now responding to the alarm, false otherwise
	 */
	private waitUntilAlarmAck(): Boolean {
		if (this.responseTime > 0) {
			this.responseTime--
		}
		return (this.responseTime < 0)
	}

	private getExit() {
		this.exit = getZone(this.body.position).exits[0]
	}

	/**
	 * Determine direction of force
	 */
	private getDirectionForceTo(towards:Vector) {
		let deltaX = towards.x - this.body.position.x
		let deltaY = towards.y - this.body.position.y
		return Vector.div(Vector.normalise({
			x: deltaX,
			y: deltaY,
		}), 110 / this.body.mass)
	}
}
