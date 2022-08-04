
import { ActionKey } from "../Model/ActionTypes"
import { Tile } from "../Model/Tile"  
import { Vector } from "../Model/Vector"
import { Spell } from "./Spell/Spell"

export {
    Entity, 
    Stats, 
    StatType,
    ChooseActionFunction, 
    isDead, 
    attack, 
    Bar,
    takeDamage,
    getEffectiveStatAtk,
    getEffectiveStatDef,
    getEffectiveSpeed,
    zeroStats,
}

interface Entity {
    location: Vector,
    isPlayer?: boolean,
    imageLookupKey: string,
    id: string,
    displayName: string,
    stats: Stats,
    buffs: Array<Buff>,
    effects: Array<Effect>,
    exp: number,
    level: number,
    equipped: Array<Spell>,
}

/**
 * When an entity is asked to pick an action for this tick,
 * this function will look at the things around the entity
 * and return a function that will do the entity's action.
 * 
 * Note that it's important we return a function, 
 * rather than doing it immediately, to make sure
 * each entity gets exactly 1 turn (otherwise one
 * entity might kill another, and the other wouldn't
 * get a turn; or an entity might move & get 2 turns because
 * it shows up in 2 tiles.)
 */
type ChooseActionFunction = 
    (self, visibleTiles: Array<Array<Tile>>)=>{action: ActionKey, target?: Entity} | null
    
enum StatType {
    health = "health",
    mana = "mana",
    will = "will",
}

type Stats = {
    [key in StatType]: Bar
}

function zeroStats(): Stats{
    return {
        health: {current: 0, max: 0, atk: 0, def: 0},
        mana: {current: 0, max: 0, atk: 0, def: 0},
        will: {current: 0, max: 0, atk: 0, def: 0},
    }
}

function isDead(entity: Entity){
  return entity.stats[StatType.health].current <= 0
}

function attack(attacker: Entity, target: Entity): Stats{
    const attackerBonus = Math.random() * .4 + .9 // between .9 and 1.3
    const damage = 
       Math.max(
           Math.round(getEffectiveStatAtk(attacker, StatType.health) * attackerBonus)  - getEffectiveStatDef(target, StatType.health),
           0
       )
    takeDamage(target, StatType.health, damage)
    const result = zeroStats()
    result.health.current = damage
    return result
}

interface Bar{
    current: number,
    max: number,
    atk: number,
    def: number,
}

/**
 * Bonuses or penalties to stats
 */
type Buff = {
    [key in keyof Stats]: number
} & {timeout: number}

/**
 * Things that happen each turn, like poison or stun
 */
interface Effect {

}

function getEffectiveStatAtk(e: Entity, statType: StatType){
    // todo combine with buffs
    return e.stats[statType].atk
}

function getEffectiveStatDef(e: Entity, statType: StatType){
    // todo combine with buffs
    return e.stats[statType].def
}

function getEffectiveSpeed(e: Entity){
    return getEffectiveStatAtk(e, StatType.will) + e.stats[StatType.will].current
}

function takeDamage(e: Entity, statType: StatType, amount: number){
    e.stats[statType].current -= amount
    return amount
}