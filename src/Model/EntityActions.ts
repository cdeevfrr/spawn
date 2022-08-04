import { bunnyAction } from "../Entities/Bunny"
import { ChooseActionFunction } from "../Entities/Entity"
import { grouchyWolfAction } from "../Entities/GrouchyWolf"


export {entityActions}

const entityActions: {[key: string]: ChooseActionFunction} = {
    "Fanged Bunny": bunnyAction,
    "Grouchy Wolf": grouchyWolfAction
  }