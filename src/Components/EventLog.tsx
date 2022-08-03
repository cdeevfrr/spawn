import React from "react";
import { EventLogType } from "../Model/PerformAction";
import { Vector, VectorMaxDistance } from "../Model/Vector";

export {EventLog}

function EventLog ({log, playerLocation}:{
    log: EventLogType,
    playerLocation: Vector,
}){
    const lines = []
    for(let i = log.length -1; i >= 0; i--){
        const tick = log[i]
        for(let j = tick.length - 1; j >= 0; j--){
            const event = tick[j]
            if ((!event.location) || VectorMaxDistance(playerLocation, event.location) <= 3){
                lines.push(event.message)
            }
        }
        lines.push("---")
    }


    return <div style={{width: "100%", height: "100%", display:"flex", flexDirection: "column"}}>
        <p>
            Historical events that happened in this location
        </p>
        <textarea 
        style={{whiteSpace:"pre", height: "100%", width: "100%"}}
        readOnly 
        value={lines.join("\n")}>
        </textarea>
    </div>
}