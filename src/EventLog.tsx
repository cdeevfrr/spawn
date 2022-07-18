import React from "react";
import { ActionKey, moveActionKeys } from "./ActionTypes";
import { PerformActionArgs } from "./GameLogic";
import { Vector, VectorMaxDistance } from "./Vector";

export {EventLog}

function EventLog ({log, playerLocation}:{
    log: Array<PerformActionArgs>,
    playerLocation: Vector,
}){
    return <div>
        <p>
            Historical events that happened in this location
        </p>
        <textarea 
        style={{whiteSpace:"pre", height: "100%"}}
        readOnly 
        value={
            log
            .filter(actionArg => actionArg == null || VectorMaxDistance(playerLocation, actionArg.entityLocation) <= 3)
            .map(entry => makeText(entry))
            .reverse()
            .join("\n")
        }>
        </textarea>
    </div>
}

const directionNames = {
    [ActionKey.Left]: "left",
    [ActionKey.Right]: "right",
    [ActionKey.Up]: "up",
    [ActionKey.Down]: "down",
}

function makeText(entry: PerformActionArgs){
    if (entry == null){

        return "---"
    }
    if(entry.action in moveActionKeys){
        return `${entry.entity.displayName} moved ${directionNames[entry.action]}`
    }
    if(entry.action === ActionKey.Attack){
        return `${entry.entity.displayName} attacked ${entry.target?.displayName}`
    }
    if(entry.action === ActionKey.DoNothing){
        return `${entry.entity.displayName} did nothing`
    }
}