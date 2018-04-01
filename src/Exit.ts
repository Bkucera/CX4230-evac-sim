import { assign } from 'lodash'
import { Vector } from "matter-js";


export default class Person {
    public position: Vector
    public width: number
	constructor(position: Vector, width: number) {
        assign(this.position, position)
        assign(this.width, width)
    }
}
