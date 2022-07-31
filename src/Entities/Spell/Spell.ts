import { Tile } from "../../Tile"
import { Entity, Stats } from "../Entity"

export { Spell }

interface Spell {
    cast: (caster: Entity, target: Entity | Array<Tile>) => Stats
}