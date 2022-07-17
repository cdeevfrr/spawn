import React from "react"
import { Tile } from "./MapHelpers"
import { imageTable } from "./imageLookup"
import { EntityComponent } from "./EntityComponent"

export {
    TileComponent
}

const tileTypeToImage = {
    1: imageTable.plainsSvg,
    2: imageTable.desertSvg,
}

function TileComponent({tileObject}: {tileObject: Tile}){
    if (!tileObject || !tileTypeToImage[tileObject.type]){
        return <img width="100%" height="100%" src={imageTable.emptySvg}/>
    }
    const image = tileTypeToImage[tileObject.type]
    let entityCounter = -1
    return <div style={{width:"100%", height:"100%"}}>
        <img width="100%" height="100%" src={image}/>
        {
            tileObject.entities.map(entity => {
                entityCounter += 1
                const key = JSON.stringify(
                    entity, 
                    (key, value) => key === "container"? undefined : value
                ) + entityCounter
                return <EntityComponent entity={entity} entityCounter={entityCounter} key={key}/>
            })
        }
    </div>
}