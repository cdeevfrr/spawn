import { Tile } from "./Tile";
import { Vector } from "./Vector";

export {ActionKey, ActionFunction, moveActionKeys}


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

const moveActionKeys = {
  [ActionKey.Left]: {x: -1, y: 0},
  [ActionKey.Right]: {x: 1, y: 0},
  [ActionKey.Up]: {x: 0, y: -1},
  [ActionKey.Down]: {x: 0, y: 1},
}