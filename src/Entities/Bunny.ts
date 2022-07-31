import { ChooseActionFunction, Entity, Stats } from "./Entity";
import { ActionKey } from "../ActionTypes";
import { Vector } from "../Vector";

export { Bunny, bunnyAction, displayName }

const displayName = "Fanged Bunny"

function Bunny(location: Vector): Entity{
    return {
        location,
        imageLookupKey: "bunnySvg",
        id: Math.random().toString(),
        displayName,
        buffs: [],
        stats: baseStats(),
        exp: 0,
        level: 1,
        effects: [],
        equipped: [],
      }
}

function baseStats(): Stats{
  return {
    health: {current: 3, max: 3, atk: 1, def: 1,},
    mana: {current: 5, max: 5, atk: 3, def: 1},
    will: {current: 5, max: 5, atk: 5, def: 5},
  }
}

const bunnyAction: ChooseActionFunction = ()=> {
  return {
      action: [
        ActionKey.Left,
        ActionKey.Right,
        ActionKey.Up,
        ActionKey.Down,
        ActionKey.DoNothing,
        ][Math.floor(Math.random() * 5)]
  }
}