import { Tile } from "./MapHelpers";
import { Vector } from "./Vector";

export {ActionKey, ActionFunction}


enum ActionKey {
    Left,
    Right,
    Up,
    Down,
  }
  
type ActionFunction = ({playerLocation, map}:{
playerLocation: Vector, 
map: Array<Array<Tile>>}) => void