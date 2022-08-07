
import { Buff, getEffectiveStatAtk, StatType, zeroStats } from "../Entity";
import { isEntity, Spell } from "./Spell";

export {wam}

// Wall of magic.
// Blocks all kinds of physical (health) attacks, but weakly
const wam : Spell = {
    name: "WAM",
    cast: (caster, targets) => {
        for(const target of targets){
            if(! isEntity(target)){

            } else {
                const buffAmount = Math.ceil(getEffectiveStatAtk(caster, StatType.mana) / 5)
                const buffUses = Math.round(3 + buffAmount);
                const buff: Buff = {...zeroStats(), uses: buffUses}
                buff.health.def += buffAmount
                
                target.buffs.push(buff)
            }
        }
        return [zeroStats()]
    }
}