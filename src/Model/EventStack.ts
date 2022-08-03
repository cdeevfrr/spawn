

/**
 * The event stack is the major loop in the game.
 * 
 * Every time the player picks an action, all entities (including the player) add their desired actions to the event stack.
 * 
 * The desired actions are then sorted, and executed one at a time.
 * 
 */

import { ActionKey } from "./ActionTypes";
import { Entity } from "../Entities/Entity";
import { Tile } from "./Tile";
import { Vector } from "./Vector";

export { EventStack }

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
    prePhase,
    mainPhase,
    postPhase,
}

class EventStack {
    currentActions: {[key in Phase]: Array<Action> }
    __constructor__(){
        this.currentActions = {
            [Phase.prePhase]: [],
            [Phase.mainPhase]: [],
            [Phase.postPhase]: [],
        }
    }

    addAction(todo: Action, phase: Phase ){
        this.currentActions[phase].push(todo)
    }

    tick(){
        
    }
}





