import React from "react"
import { Tile } from "../Tile"
import { imageTable } from "../imageLookup"
import { EntityComponent } from "./EntityComponent"

export {
    TileComponent
}

const tileTypeToImage = {
    1: imageTable.plainsSvg,
    2: imageTable.desertSvg,
}

function TileComponent({tileObject}: {tileObject: Tile}){
    const image = tileTypeToImage[tileObject?.type]
    let entityCounter = -1
    return <div style={{width:"100%", height:"100%"}}>
        <img width="100%" height="100%" src={image || imageTable.emptySvg}/>
        {
            tileObject?.entities?.map(entity => {
                entityCounter += 1
                const key = JSON.stringify(entity) + entityCounter
                return <EntityComponent entity={entity} entityCounter={entityCounter} key={key}/>
            })
        }
    </div>
}