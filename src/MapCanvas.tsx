import React, { useEffect, useRef } from "react"
import { Tile } from "./MapHelpers"
import { TileComponent } from "./TileComponent"

export {MapCanvas}

function MapCanvas({map, percentage}: {map: Array<Array<Tile>>, percentage: number}){
    if (percentage < 30){
        throw new Error("Haven't gotten CSS styling working for small maps yet")
    }
    const columnCount = map[0].length
    let counter = 0 // Make unique keys for React rendering optimization.
    const rows = []
    const columns = []
    for (let i = 0; i < columnCount; i ++){
        rows.push((percentage / columnCount) + "vh")
        columns.push((percentage / columnCount) + "vw")
    }
    return <div style={{
        display:"grid", 
        gridTemplateColumns: columns.join(" "),
        gridTemplateRows: rows.join(" "),
        gap: ".5vw",
        width: percentage + "vw",
        }}>
    {
        map.map(row =>
            row.map(tile => {
                // https://stackoverflow.com/questions/4910567/hide-certain-values-in-output-from-json-stringify
                const entityContainerReducer = (key, value) => key === 'container'? undefined: value
                // Keys needed so react knows when to re-render a tile.
                const key = (counter ++) + JSON.stringify(tile, entityContainerReducer)
                return <TileComponent tileObject={tile} key={key}></TileComponent>
            })
        )
    }
    </div>
     
}