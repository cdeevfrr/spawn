import { json } from 'stream/consumers';
import { Vector, VectorPlus } from './Vector';
import { Tile } from './Tile';
import { Entity } from './Entities/Entity';

export { 
    getTiles, 
    getTile,
    parse, 
    findPlayerTileIndex, 
    removeEntity,
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

function findPlayerTileIndex(map: Array<Array<Tile>>){
    for(let y = 0; y < map.length; y++){
        for(let x = 0; x < map[y].length; x++){
            if(map[y][x].entities.some(entity=> entity.isPlayer)){
                return {x, y}
            }
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
/**
 * 
 * @param map 
 * @param entity 
 * @param startLocation 
 * @param direction 
 * @returns The final location of the entity, whether the move worked or not.
 */
function moveEntity(map: Array<Array<Tile>>, entity: Entity, startLocation: Vector, direction: Vector): Vector{
    const newLocation = VectorPlus(startLocation, direction)
    const newTile = getTile(newLocation, map)
    if (!newTile){
        return startLocation
    }

    removeEntity(getTile(startLocation, map), entity)
    newTile.entities.push(entity)
    entity.container = newTile
    return newLocation
}