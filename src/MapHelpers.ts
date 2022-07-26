import { json } from 'stream/consumers';
import { Vector, VectorPlus } from './Vector';
import { Tile } from './Tile';
import { Entity } from './Entities/Entity';

export { 
    getTiles, 
    getTile,
    parse, 
    findPlayer, 
    removeEntity,
    teleportEntity,
    moveEntity,
}

/// Tiles included for various render distances.
// Render in a square.
// 3
//   2
//     1
//     1 0
//     1
//   2 2 2
// 3            3
function getTiles(
    map: Array<Array<Tile>>, 
    playerLocation: Vector, 
    renderDistance: number = 3,
){
    if (playerLocation == null){
        return [[]]
    }
    let topLeft = playerLocation
    for (let i = 0; i < renderDistance; i ++){
        topLeft = VectorPlus(topLeft, {x: -1, y: -1})
    }

    const result = []

    for (let y = 0; y < renderDistance * 2 + 1; y ++){
        const row = []
        result.push(row)
        for(let x = 0; x < renderDistance * 2 + 1; x ++){
            row.push(getTile(VectorPlus(topLeft, {x, y}), map))
        }
    }
    return result
}

function getTile(v: Vector, map: Array<Array<Tile>>){
  if (v.x < 0 || v.y < 0 || v.y >= map.length || v.x >= map[v.y].length){
      return null
  }
  return map[v.y][v.x]
}

function parse(loadedMap: Array<Array<{t: number}>>){
    return loadedMap.map(row =>
        row.map(pseudoTile => {
            const newTile: Tile = {
                type: pseudoTile.t,
                entities: []
            }
            return newTile
        })) 
}

function findPlayer(map: Array<Array<Tile>>){
    for(let y = 0; y < map.length; y++){
        for(let x = 0; x < map[y].length; x++){
            const player = map[y][x].entities.find(entity=> entity.isPlayer)
            if( player ){ return player}
        }
    }
    return null
}

function removeEntity(t: Tile, e: Entity){
    const index = t.entities.indexOf(e);
    if (index > -1) { 
        t.entities.splice(index, 1); 
    }
}

function moveEntity(map: Array<Array<Tile>>, entity: Entity, direction: Vector){
    const newLocation = VectorPlus(entity.location, direction)
    return teleportEntity(map, entity, newLocation)
}

function teleportEntity(map: Array<Array<Tile>>, entity: Entity, destination: Vector){
    const newTile = getTile(destination, map)
    if (!newTile){
        return
    }

    // add checks for tile type?


    removeEntity(getTile(entity.location, map), entity)
    newTile.entities.push(entity)
    entity.location = destination
}