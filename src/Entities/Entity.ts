
import { ActionKey } from "../ActionTypes"
import { Tile } from "../Tile"  

export {Entity, Stats, ChooseActionFunction, isDead, attack, Bar}

interface Entity {
    container: Tile,
    isPlayer?: boolean,
    imageLookupKey: string,
    id: string,
    displayName: string,
    stats: Stats,
    buffs: Array<Buff>,
    exp: number,
    level: number,
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
    

interface Stats{
    health: Bar,
    mana: Bar,
    will: Bar,
    strength: number,
    magic: number,
    stamina: number,
}

function zeroStats(){
    return {
        health: {current: 0, max: 0},
        strength: 0,
        magic: 0,
        mana: {current: 0, max: 0},
        stamina: 0,
        will: {current: 0, max: 0},
    }
}

function isDead(entity: Entity){
  return entity.stats.health.current <= 0
}

function attack(attacker: Entity, target: Entity): Stats{
    const attackerBonus = Math.random() * .4 + .9 // between .9 and 1.3
    const damage = 
       Math.round(attacker.stats.strength * attackerBonus)  - target.stats.strength
    target.stats.health.current -= damage
    const result = zeroStats()
    result.health.current = damage
    return result
}

interface Bar{
    current: number,
    max: number,
}

type Buff = {
    [key in keyof Stats]: number
} & {timeout: number}