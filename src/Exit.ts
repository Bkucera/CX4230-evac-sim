import { assign } from 'lodash'
import { Vector } from "matter-js";


export default class Exit {
    public position: Vector // the top left corner of the exit (x, y)
    public length: number // the length of the exit; 0 if the exit is vertical
    public width: number // the width of the exit; 0 of the exit is horizontal
	constructor(position: Vector, length: number, width: number) {
        assign(this.position, position)
        assign(this.length, length)
        assign(this.width, width)
    }
}
