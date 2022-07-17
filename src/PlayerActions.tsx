import React from "react";
import { Tile } from "./MapHelpers";
import { ActionFunction, ActionKey } from "./PlayerActionTypes";

export {PlayerActions}

function PlayerActions({tile, playerChoseAction}: {tile: Tile, playerChoseAction: (ActionKey) => void}) {
    return <div >
        <div style={{margin: "1vh",  
        display: "grid", gridTemplateAreas: `
        'corner1 top corner2'
        'left mid right'
        `}}>
        <button onClick={()=> playerChoseAction(ActionKey.Left)} style={{gridArea: "left"}} >Left</button>
        <button onClick={()=> playerChoseAction(ActionKey.Right)} style={{gridArea: "right"}} >Right</button>
        <button onClick={()=> playerChoseAction(ActionKey.Up)} style={{gridArea: "top"}} >Up</button>
        <button onClick={()=> playerChoseAction(ActionKey.Down)} style={{gridArea: "mid"}} >Down</button>
        </div>
    </div>
}