import React, { ReactNode, useState } from "react";
import { Entity } from "../Entities/Entity";
import { ActionKey } from "../Model/ActionTypes";
import { Tile } from "../Model/Tile";
import { PlayerInfoComponent } from "./PlayerInfoComponent";

export {PlayerActions}

function PlayerActions({playerChoseAction, player, playerTile}: {
    playerTile: Tile,
    player: Entity
    playerChoseAction: (ActionKey: ActionKey, extraData?: any) => void
}) {
    return <div style={{display:"flex", flexDirection: "column", width: "100%", height: "100%"}} >
        <div style={{margin: "2vw",  
        display: "grid", gridTemplateAreas: `
        'corner1 top corner2'
        'left mid right'`,
        }}>
            <button onClick={()=> playerChoseAction(ActionKey.Left)} style={{gridArea: "left"}}>L</button>
            <button onClick={()=> playerChoseAction(ActionKey.Right)} style={{gridArea: "right"}}>R</button>
            <button onClick={()=> playerChoseAction(ActionKey.Up)} style={{gridArea: "top"}}>U</button>
            <button onClick={()=> playerChoseAction(ActionKey.Down)} style={{gridArea: "mid"}}>D</button>
        </div>
        <div>
            <button onClick={()=> playerChoseAction(ActionKey.DoNothing)}>Do Nothing</button>
        </div>
        <PlayerInfoComponent playerTile={playerTile} player={player} playerChoseAction={playerChoseAction}/>
    </div>
}