import React, { useEffect, useState } from 'react';
import './App.css';
import { Bunny } from './Entities/Bunny';
import { Player } from './Entities/Player';
import { MapCanvas } from './MapCanvas';
import { findPlayerTileIndex, getTiles, parse, removeEntity, Tile } from './MapHelpers';
import mapData from './Resources/map.json'

export {
  App
}

const spawnLocation = {x: 13, y: 14}

/**
 * The App component will handle all game state, mainly saved in the 'map' variable.
 * 
 * All subcomponents must call setMap.
 * 
 * @param props 
 * @returns 
 */
function App(props) {
  const [ map, setmap ] = useState([[]])

  let playerLocation = findPlayerTileIndex(map)

  useEffect(() => { // load the map from file only on first load
    const loadedMap = parse(mapData)

    playerLocation = findPlayerTileIndex(loadedMap)
    if (playerLocation === null){
      playerLocation = respawnPlayer(loadedMap)
    }

    const bunnyTile = loadedMap[13][12]
    bunnyTile.entities.push(Bunny(bunnyTile))
    bunnyTile.entities.push(Bunny(bunnyTile))
    bunnyTile.entities.push(Bunny(bunnyTile))
    bunnyTile.entities.push(Bunny(bunnyTile))

    loadedMap[playerLocation.y][playerLocation.x].type = 2
    bunnyTile.type = 2


    setmap(loadedMap)
  }, []) 

  const submap = getTiles(map, playerLocation)

  return (
    <div className="App">
      <div style={{
        display: "grid", 
        gridTemplateAreas: `
          'header header header header header header' 
          'left middle middle middle middle right' 
          'footer footer footer footer footer footer'`
        }}>

        <div style={{gridArea: "header", height: "10vh"}} className = "App-header">
          <p>
            Spawn
          </p>
        </div>

        <div style={{ gridArea: "middle", display: "flex", justifyContent: "center" }}>
          <MapCanvas map={submap} percentage={80} />
        </div>

        <div style={{ gridArea: "left", display: "flex", justifyContent: "center" }}>
          <MapCanvas map={submap} percentage={10} />
        </div>


      </div>

    </div>
  );
}

function respawnPlayer(map: Array<Array<Tile>>){
  let playerLocation = findPlayerTileIndex(map)
  if (playerLocation){
    const oldTile = map[playerLocation.y][playerLocation.x]
    const playerEntity = oldTile.entities.find(e => e.isPlayer)
    if (playerLocation != null){
      removeEntity(oldTile, playerEntity)
    }
  }

  const tile = map[spawnLocation.y][spawnLocation.x]
  tile.entities.push(Player(tile))
  return spawnLocation
}
