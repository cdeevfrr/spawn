import { ActionKey } from "./ActionTypes";
import { Entity } from "./Entities/Entity";
import { Tile } from "./Tile";
import { Vector } from "./Vector";

export {
    PerformActionArgs,
    eventLogEntry,
}

interface PerformActionArgs {
    entity: Entity,
    entityLocation: Vector,
    action: ActionKey,
    target?: Entity,
    map: Array<Array<Tile>>,
  }

type eventLogEntry = PerformActionArgs & {logVisible: boolean}
