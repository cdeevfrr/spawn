import React from "react";
import { Tile } from "./MapHelpers";
import { ActionKey } from "./PlayerActionTypes";
import Popup from 'reactjs-popup';

export {PlayerActions}

function PlayerActions({tile, playerChoseAction}: {tile: Tile, playerChoseAction: (ActionKey: ActionKey, extraData?: any) => void}) {
    return <div >
        <div style={{margin: "1vh",  
        display: "grid", gridTemplateAreas: `
        'corner1 top corner2'
        'left mid right'
        `}}>
            <button onClick={()=> playerChoseAction(ActionKey.Left)} style={{gridArea: "left"}}>Left</button>
            <button onClick={()=> playerChoseAction(ActionKey.Right)} style={{gridArea: "right"}}>Right</button>
            <button onClick={()=> playerChoseAction(ActionKey.Up)} style={{gridArea: "top"}}>Up</button>
            <button onClick={()=> playerChoseAction(ActionKey.Down)} style={{gridArea: "mid"}}>Down</button>
        </div>
        <div>
            <button onClick={()=> playerChoseAction(ActionKey.DoNothing)}>Do Nothing</button>
            <Popup trigger={<button>Attack</button>} modal>
            <div style={{backgroundColor: "#ffffff", margin: "5%", }}>
                <div>Choose something to target!</div>
                {
                    tile.entities.map(entity => 
                        <button style={{margin: "5%"}} key={entity.id} onClick={() => playerChoseAction(ActionKey.Attack, {target: entity})}>{entity.displayName}</button>)
                }
            </div>
            </Popup>
        </div>
    </div>
}