import { assign } from 'lodash'
import { Vector } from "matter-js";
import { Zone } from './Mapper';


export default class Exit {
    public position: Vector // the top left corner of the exit (x, y)
    public length: number // the length of the exit; 0 if the exit is vertical
    public width: number // the width of the exit; 0 of the exit is horizontal
    public nextZone: Zone // if this is the final exit
	constructor(params: Partial<Exit>) {
        assign(this, params)
    }
}
