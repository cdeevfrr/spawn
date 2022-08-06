import { Tile } from "./Tile";
import { Vector } from "./Vector";

export {ActionKey, ActionFunction, moveActionKeys, spellNumber}


enum ActionKey {
    Left = 10,
    Right = 11,
    Up = 12,
    Down = 13,
    DoNothing = 14,
    Attack = 15,
    Spell0 = 0,
    Spell1 = 1,
    Spell2 = 2,
    Spell3 = 3,
    Spell4 = 4,
}

function spellNumber(n: number): ActionKey{
  if (0 <= n && n <= 4){
    return n
  }
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