import { Vector } from "../Model/Vector"
import { Entity, Stats } from "./Entity"
import { fireball } from "./Spell/Fireball"
import { heal } from "./Spell/heal"
import { wam } from "./Spell/wam"

export { makePlayer }

function makePlayer(location: Vector): Entity{
    return {
        location,
        imageLookupKey: "playerCharacterSvg",
        isPlayer: true,
        id: Math.random().toString(),
        displayName: "You",
        buffs: [],
        stats: baseStats(),
        exp: 0,
        level: 1,
        effects: [],
        equipped: [fireball, heal, wam],
      }
}

function baseStats(): Stats{
  return {
    health: {current: 10, max: 10, atk: 3, def: 3},
    mana: {current: 5, max: 5, atk: 3, def: 3},
    will: {current: 5, max: 5, atk: 3, def: 3},
  }

}