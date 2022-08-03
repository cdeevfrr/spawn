import React from "react";
import { Entity } from "../Entities/Entity";
import { EntityStats } from "./EntityStats";
import { Tile } from "../Tile";

export {PlayerInfoComponent}

function PlayerInfoComponent({playerTile, player}:{playerTile: Tile, player: Entity} ){
    return <div style={{
        display: "grid", 
        gridTemplateColumns: "25vw 25vw 25vw 25vw",
        gridTemplateRows: "5vh 5vh 5vh",
        gridTemplateAreas: `
          'player player e1 e2' 
          'player player e3 e4' 
          'player player e5 e6'`,
    }}>
        <div style={{gridArea: "player", height: "100%"}}>
            <EntityStats entity={player}/>
        </div>
        {
            playerTile.entities.filter(e => !e.isPlayer).map(entity =>{
                return <div>
                    <EntityStats entity={entity}/>
                </div>
            })
        }
    </div>
}
