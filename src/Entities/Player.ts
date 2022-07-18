import { Tile } from "../Tile"
import { Entity, Stats } from "./Entity"

export { makePlayer }

interface Player extends Entity{
  exp: number,
  level: number,
}

function makePlayer(location: Tile): Player{
    return {
        container: location,
        imageLookupKey: "playerCharacterSvg",
        isPlayer: true,
        id: Math.random().toString(),
        displayName: "You",
        buffs: [],
        stats: baseStats(),
        exp: 0,
        level: 1,
      }
}

function baseStats(): Stats{
  return {
    health: {current: 10, max: 10},
    strength: 3,
    mana: {current: 5, max: 5},
    magic: 3,
    will: {current: 5, max: 5},
    stamina: 3,
  }

}