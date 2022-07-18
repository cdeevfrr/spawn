import React from "react"
import { Entity } from "./Entities/Entity"
import { imageTable } from "./imageLookup"


export {EntityComponent}

function EntityComponent({entity, entityCounter}: {entity: Entity, entityCounter: number, key: string}){
    const left = (entityCounter * (- 6 )) + "%"
    const tileTop = (-100 + -60 * entityCounter ) // Because this object will be down by 100% for the tile, then 60% for each entity.
    const top = (tileTop + entityCounter*8 ) + "%"
    return <img 
      style={{position:"relative", top, left, width: "60%", height: "60%", zIndex: entityCounter}} 
      src={imageTable[entity.imageLookupKey]}
    />
}