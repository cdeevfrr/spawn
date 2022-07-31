import { Tile } from "../../Tile";
import { Entity, getEffectiveStatAtk, takeDamage, StatType, getEffectiveStatDef, zeroStats } from "../Entity";
import { Spell } from "./Spell";

export { fireball }

/**
 * A fireball spell does direct damage to the target.
 * 
 * No requirements to cast.
 * 
 * The damage is based on the caster & target's mana stats.
 */

const fireball : Spell = {
    cast: (caster: Entity, target: Entity | Array<Tile>) => {
        if (target instanceof Array){
            return zeroStats()
        }
        const damage = getEffectiveStatAtk(caster, StatType.mana) - getEffectiveStatDef(target, StatType.mana)
        const actualDamage = takeDamage(target, StatType.health, damage)
        const result = zeroStats()
        result.health.current -= actualDamage
        return result
    }
}