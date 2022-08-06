import React, { ReactNode } from "react"
import Popup from "reactjs-popup"
import { ChooseActionFunction, Entity } from "../Entities/Entity"
import { ActionKey, spellNumber } from "../Model/ActionTypes"

export {TargetButton}

function TargetButton({entity, player, playerChoseAction}: {
        entity: Entity, 
        player: Entity,
        playerChoseAction: (ActionKey: ActionKey, extraData?: any) => void,
    }){
    return <Popup trigger={<button>Target</button>} modal>
        {(close => (
        <div style={{backgroundColor: "#ffffff", margin: "5%", }}>
        <div>What will you do to the target?</div>
            {actionButton(ActionKey.Attack, "attack", entity, playerChoseAction, close)}
            {
            player.equipped.map((spell, index) => 
                actionButton(spellNumber(index),spell.name, entity, playerChoseAction, close))
            }
        </div>
        // https://stackoverflow.com/questions/68085033/how-can-i-close-a-reactjs-popup-modal-on-submit/73015201#73015201
        )) as unknown as ReactNode} 
    </Popup>
}

function actionButton(actionKey: ActionKey, text: String, entity, playerChoseAction, close){
    return <button style={{margin: "5%"}} key={actionKey}
        onClick={() => {
            playerChoseAction(actionKey, {target: entity})
            close()
        }
    }>{text}</button>
}