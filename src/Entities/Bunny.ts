import { ChooseActionFunction, Entity, Stats } from "./Entity";
import { Tile } from "../Tile";
import { ActionKey } from "../ActionTypes";

export { Bunny, bunnyAction, displayName }

const displayName = "Fanged Bunny"

function Bunny(location: Tile): Entity{
    return {
        container: location,
        imageLookupKey: "bunnySvg",
        id: Math.random().toString(),
        displayName,
        buffs: [],
        stats: baseStats(),
        exp: 0,
        level: 1,
      }
}

function baseStats(): Stats{
  return {
    health: {current: 3, max: 3},
    strength: 1,
    mana: {current: 5, max: 5},
    magic: 1,
    will: {current: 5, max: 5},
    stamina: 5,
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