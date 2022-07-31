import { ChooseActionFunction, Entity, Stats } from "./Entity";
import { Tile } from "../Tile";
import { ActionKey, moveActionKeys } from "../ActionTypes";
import { Vector, VectorPlus } from "../Vector";
import { displayName as bunnyDisplayName } from "./Bunny";

export {GrouchyWolf, grouchyWolfAction, displayName}

const displayName = "Grouchy Wolf"

function GrouchyWolf(location: Vector): Entity{
    return {
        location,
        imageLookupKey: "grouchyWolfSvg",
        id: Math.random().toString(),
        displayName,
        buffs: [],
        stats: baseStats(),
        exp: 0,
        level: 1,
        effects: [],
        equipped: [],
      }
}

function baseStats(){
    return {
        health: {current: 5, max: 5, atk: 5, def: 2},
        mana: {current: 5, max: 5, atk: 1, def: 1},
        will: {current: 3, max: 3, atk: 1, def: 1},
      }
}

const directionOrdering = [
    ActionKey.Left,
    ActionKey.Up,
    ActionKey.Right,
    ActionKey.Down,
]

const grouchyWolfAction: ChooseActionFunction = function(self, visibleTiles){
    // Attack any entities on my square.
    const onMyLawn = visibleTiles[1][1].entities.find(entity=> entity.id != self.id)
    if (onMyLawn){
        return { 
            action: ActionKey.Attack,
            target: onMyLawn
        }
    }

    // Move 1 space towards bunnies
    for(const direction in moveActionKeys){
        const index = VectorPlus({x:1, y:1}, moveActionKeys[direction])
        if(containsBunny(visibleTiles[index.y][index.x])){
            return {action: direction}
        }
    }
    // Move 2 spaces towards bunnies
    for(let i = 0; i < directionOrdering.length; i ++){
        const direction1 = moveActionKeys[directionOrdering[i]]
        const direction2 = moveActionKeys[directionOrdering[(i+1)%4]]
        const index = VectorPlus(VectorPlus({x:1, y:1}, direction1),direction2)
        if(containsBunny(visibleTiles[index.y][index.x])){
            return {action: direction1}
        }
    }
    // Move in a random direction
    if(Math.random() < .3){
        return {
            action: directionOrdering[Math.round(Math.random()*4)]
        }
    }
    return null
}

function containsBunny(tile: Tile){
    if (tile === null){
        return false
    }
    return tile.entities.some(e => e.displayName === bunnyDisplayName)
}