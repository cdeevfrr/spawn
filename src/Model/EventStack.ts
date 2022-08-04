

/**
 * The event stack is the major loop in the game.
 * 
 * Every time the player picks an action, all entities (including the player) add their desired actions to the event stack.
 * 
 * The desired actions are then sorted, and executed one at a time.
 * 
 */

import { ActionKey } from "./ActionTypes";
import { Entity, isDead } from "../Entities/Entity";
import { Tile } from "./Tile";
import { Vector } from "./Vector";
import { performAction } from "./PerformAction";

export { EventStack, Phase}

type Action = {
    actor: Entity,
    actorLocation: Vector,
    map: Array<Array<Tile>>,
    action: ActionKey,
    speed: number,
    occurIfDead?: boolean,
    occurIfStunned?: boolean,
    target?: Entity,
}

enum Phase {
    prePhase = "B",
    mainPhase = "M",
    postPhase = "A",
}

class EventStack {
    currentActions: {[key in Phase]: Array<Action> }

    constructor(){
        this.currentActions = {
            [Phase.prePhase]: [],
            [Phase.mainPhase]: [],
            [Phase.postPhase]: [],
        }
    }

    addAction(todo: Action, phase: Phase ){
        this.currentActions[phase].push(todo)
    }

    tick(map: Array<Array<Tile>>): Array<String>{
        const eventLog = []

        for (const phase of Object.values(Phase)){

            this.currentActions[phase].sort((x, y) => x.speed - y.speed)

            while (this.currentActions[phase].length > 0){
                const nextAction = this.currentActions[phase].pop()

                if ((! isDead(nextAction.actor)) || nextAction.occurIfDead){
                    // TODO: If not stunned:
                    performAction({
                        action: nextAction.action,
                        entity: nextAction.actor,
                        entityLocation: nextAction.actor.location,
                        map,
                        target: nextAction.target
                    }, eventLog)
                }
            }
        }

        return eventLog
    }
}





