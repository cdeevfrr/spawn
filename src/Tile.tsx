import React from "react"
import { Tile } from "./MapHelpers"
import plainsSvg from "./Resources/images/plainsTile.svg"
import emptySvg from "./Resources/images/emptyTile.svg"
import desertSvg from "./Resources/images/desertTile.svg"


export {
    TileComponent
}

function TileComponent({tileObject}: {tileObject: Tile}){
    if (tileObject === null){
        return makeImage(emptySvg)
    }
    switch(tileObject.type){
        case 1:
            return makeImage(plainsSvg)
        case 2:
            return makeImage(desertSvg)
    }
    return makeImage(plainsSvg)
}

function makeImage(image){
    return <img width="100%" height="100%" src={image}/> 
}