import React from "react";
import { Tile } from "./MapHelpers";
import { ActionFunction, ActionKey } from "./PlayerActionTypes";

export {PlayerActions}

function PlayerActions({tile, playerChoseAction}: {tile: Tile, playerChoseAction: (ActionKey) => void}) {
    return <div>
        <button onClick={()=> playerChoseAction(ActionKey.Left)}>Left</button>
        <button onClick={()=> playerChoseAction(ActionKey.Right)}>Right</button>
        <button onClick={()=> playerChoseAction(ActionKey.Up)}>Up</button>
        <button onClick={()=> playerChoseAction(ActionKey.Down)}>Down</button>
    </div>
}