import React from "react"
import { Entity } from "./MapHelpers"
import { imageTable } from "./imageLookup"


export {EntityComponent}

function EntityComponent({entity, entityCounter}: {entity: Entity, entityCounter: number, key: string}){
    return <img 
      style={{position:"relative", top: "0", left: "0", width: "60%", height: "60%"}} 
      src={imageTable[entity.imageLookupKey]}
    />
}