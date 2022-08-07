import { Tile } from "../../Model/Tile"
import { Entity, Stats } from "../Entity"

export { Spell, isEntity }

interface Spell {
    cast: (caster: Entity, target: Array<Entity> | Array<Tile>) => Array<SpellResult>
    name: string,
}

function isEntity(thing: Entity | Tile): thing is Entity{
    return (thing as Entity).stats !== undefined
}

/**
 * A spell result shows the stats directly effected by a spell.
 * Positive numbers for health, negative for damage.
 * Can affect any current values, max values, atk or def values.
 * 
 * TODO add applied buffs to spellResults
 */
type SpellResult = Stats
