import React from "react";
import { Entity } from "../Entities/Entity";
import { StatBarComponent } from "./StatBarComponent";

export {EntityStats}

function EntityStats({entity}:{ entity: Entity}){
    return <div style={{display: "flex", flexDirection: "column", margin: "1vw", height: "100%"}}>
        <label>{entity.displayName}</label>
        <div style={{
            display: "grid", 
            justifyItems: "left",
            justifyContent: "left",
            alignItems: "center",
            textAlign: "left",
            gridTemplateColumns: "auto auto",
            gridTemplateRows: "auto auto auto",
            minHeight: "0px"
            }}>
              <div>Health</div> <StatBarComponent bar={entity.stats.health} color="#FA213E" />
              <div>Mana</div> <StatBarComponent bar={entity.stats.mana} color="#21B9FA" />
              <div>Will</div> <StatBarComponent bar={entity.stats.will} color="#9CF66F" />
        </div>

        {/* <div style={{display: "flex", flexDirection: "row", justifyContent: "left", width: "100%", height: "100%"}}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "left", textAlign: "left"}}>
                <label>Health</label>
                <label>Mana</label>
                <label>Will</label>
            </div>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "left"}}>
                <StatBarComponent bar={entity.stats.health} color="#FA213E" />
                <StatBarComponent bar={entity.stats.mana} color="#21B9FA" />
                <StatBarComponent bar={entity.stats.will} color="#9CF66F" />
            </div>
        </div> */}
    </div>


}