import { assign } from 'lodash'
import { Vector } from "matter-js";


export default class Hazard {
    public position: Vector // the top left corner of the hazard (x, y)
    public length: number // the length of the hazard
    public width: number // the width of the hazard
	constructor(position: Vector, length: number, width: number) {
        assign(this.position, position)
        assign(this.length, length)
        assign(this.width, width)
    }
}
