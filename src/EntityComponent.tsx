import React from "react"
import { Entity } from "./MapHelpers"
import { imageTable } from "./imageLookup"


export {EntityComponent}

function EntityComponent({entity, entityCounter}: {entity: Entity, entityCounter: number, key: string}){
    const left = (entityCounter * (- 6 )) + "%"
    const top = (-100 + (entityCounter *  6 ) - (53 * entityCounter)) + "%"
    return <img 
      style={{position:"relative", top, left, width: "60%", height: "60%", zIndex: entityCounter}} 
      src={imageTable[entity.imageLookupKey]}
    />
}