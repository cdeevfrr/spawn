import { ActionKey, moveActionKeys } from "./ActionTypes"
import { attack, Entity, isDead } from "../Entities/Entity"
import { getTile, moveEntity, removeEntity } from "./MapHelpers"
import { Tile } from "./Tile"
import { Vector } from "./Vector"

export {performAction}

/**
 * The provided entity, which is in the tile at entityLocation, wants to
 * perform this action on that target.
 * 
 * Return the entity's new location after the action (mainly only used if the player moves)
 */
function performAction(
    {
        entity, 
        entityLocation, 
        action, 
        target, 
        map
    }: {
        entity: Entity,
        entityLocation: Vector,
        action: ActionKey,
        target?: Entity,
        map: Array<Array<Tile>>,
    }, eventLog: Array<{message: String, location?: Vector}>): Vector 
{
    if (action in moveActionKeys){
      const oldLocation = entity.location  
      moveEntity(map, entity, moveActionKeys[action])
      if (entity.location != oldLocation){
        // addLog(eventLog,
        //     `${entity.displayName} moved ${directionNames[action]}`,
        //     entityLocation)
      }
    }

    if (action == ActionKey.Attack){
      if (target){
        const damage = attack(entity, target)
        addLog(eventLog,
            `${damage.health.current} ${entity.displayName} attacked ${target?.displayName} for ${damage.health.current} health points`,
            entityLocation)
        if(isDead(target)){
            addLog(eventLog,
                `XP ${target.displayName} died!`,
                entityLocation)
            
            removeEntity(getTile(target.location, map), target)
        }
      }
      return entityLocation
    }
    if (action == ActionKey.DoNothing){
        // addLog(eventLog,
        //     `${entity.displayName} did nothing`,
        //     entityLocation)
        return entityLocation
    }
}

const directionNames = {
    [ActionKey.Left]: "left",
    [ActionKey.Right]: "right",
    [ActionKey.Up]: "up",
    [ActionKey.Down]: "down",
}

function addLog(eventLog: Array<{message: String, location?: Vector}>, message: String, location: Vector){
    eventLog.push({
        message,
        location,
    })
}