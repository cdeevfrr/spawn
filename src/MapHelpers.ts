import { json } from 'stream/consumers';
import { Vector, VectorPlus } from './Vector';

export { Tile, Entity, getTiles, parse, findPlayerTileIndex }

interface Tile {
    type: number,
    entities: Array<Entity>
}

interface Entity {
    container: Tile,
    isPlayer?: boolean
    imageLookupKey: string
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