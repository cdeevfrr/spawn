import { Tile } from "../../Tile"
import { Entity, Stats } from "../Entity"

export { Spell, isEntity }

interface Spell {
    cast: (caster: Entity, target: Array<Entity> | Array<Tile>) => Array<SpellResult>
}

function isEntity(thing: Entity | Tile): thing is Entity{
    return (thing as Entity).stats !== undefined
}

type SpellResult = Stats
