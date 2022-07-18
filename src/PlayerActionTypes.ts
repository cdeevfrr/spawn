import { Tile } from "./Tile";
import { Vector } from "./Vector";

export {ActionKey, ActionFunction}


enum ActionKey {
    Left,
    Right,
    Up,
    Down,
    DoNothing,
    Attack,
    Spell1,
    Spell2,
    Spell3,
    Spell4,
  }
  
type ActionFunction = ({playerLocation, map}:{
playerLocation: Vector, 
map: Array<Array<Tile>>},
extraData?: any) => void