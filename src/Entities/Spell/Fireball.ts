import { Tile } from "../../Model/Tile";
import { Entity, getEffectiveStatAtk, takeDamage, StatType, getEffectiveStatDef, zeroStats } from "../Entity";
import { Spell, isEntity } from "./Spell";

export { fireball }

/**
 * A fireball spell does direct damage to the target.
 * 
 * No requirements to cast.
 * 
 * The damage is based on the caster & target's mana stats.
 */

const fireball : Spell = {
    name: "fireball",
    cast: (caster: Entity, targets: Array<Entity | Tile>) => {
        const resultArray = []
        for (const target of targets){
            if (! isEntity(target)){
                resultArray.push(zeroStats())
            } else {
                const damage = getEffectiveStatAtk(caster, StatType.mana) - getEffectiveStatDef(target, StatType.mana)
                const actualDamage = takeDamage(target, StatType.health, damage)
                const result = zeroStats()
                result.health.current -= actualDamage 
                resultArray.push(result)
            }
        }
        return resultArray
    }
}