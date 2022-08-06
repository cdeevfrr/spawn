import React from "react";
import { Entity } from "../Entities/Entity";
import { EntityStats } from "./EntityStats";
import { Tile } from "../Model/Tile";
import { TargetButton } from "./TargetButton";
import { ActionKey } from "../Model/ActionTypes"


export {PlayerInfoComponent}

function PlayerInfoComponent({playerTile, player, playerChoseAction}:{
        playerTile: Tile, 
        player: Entity,
        playerChoseAction: (ActionKey: ActionKey, extraData?: any) => void,
    } ){
    return <div style={{
        display: "grid", 
        gridTemplateColumns: "25vw 25vw 25vw 25vw",
        gridTemplateRows: "5vh 5vh 5vh",
        gridTemplateAreas: `
          'player player e1 e2' 
          'player player e3 e4' 
          'player player e5 e6'`,
    }}>
        <TargetableEntity 
          entity={player}
          player={player}
          playerChoseAction={playerChoseAction}
          style={{gridArea: "player", height: "100%"}}
        />
        {
            playerTile.entities.filter(e => !e.isPlayer).map(entity =>{
                return <TargetableEntity
                entity = {entity}
                player = {player}
                playerChoseAction = {playerChoseAction}
                />
            })
        }
    </div>
}

function TargetableEntity({entity, player, playerChoseAction, style}:{
    entity: Entity,
    player: Entity,
    playerChoseAction: (ActionKey: ActionKey, extraData?: any) => void,
    style?:  React.CSSProperties
}){
    return <div style={{...style, display: "flex", flexDirection: "column" }}>
        <EntityStats entity={entity}/>
        <TargetButton entity={entity} player={player} playerChoseAction={playerChoseAction}/>
    </div>
}
