import { Entity, Stats } from "./Entity";
import { Tile } from "../Tile";

export { Bunny }

function Bunny(location: Tile): Entity{
    return {
        container: location,
        imageLookupKey: "bunnySvg",
        id: Math.random().toString(),
        displayName: "Fanged Bunny",
        buffs: [],
        stats: baseStats(),
      }
}

function baseStats(): Stats{
  return {
    health: {current: 5, max: 5},
    strength: 1,
    mana: {current: 5, max: 5},
    magic: 1,
    will: {current: 5, max: 5},
    stamina: 5,
  }

}