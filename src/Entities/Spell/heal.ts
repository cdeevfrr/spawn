import { getEffectiveStatAtk, StatType, takeDamage, zeroStats } from "../Entity";
import { isEntity, Spell } from "./Spell";

export {heal}

const heal: Spell = {
    name: "heal",
    cast: (caster, targets) => {
        const resultArray = []
        for(const target of targets){
            if(! isEntity(target)){

            } else {
                const healAmount = getEffectiveStatAtk(caster, StatType.mana) + getEffectiveStatAtk(target, StatType.mana)
                const actualDamage = takeDamage(target, StatType.health, -healAmount)
                const result = zeroStats()
                result.health.current -= actualDamage 
                resultArray.push(result)
            }
        }
        return resultArray
    }
    
}