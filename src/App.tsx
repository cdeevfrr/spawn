import { nextTick } from 'process';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Bunny } from './Entities/Bunny';
import { Player } from './Entities/Player';
import { MapCanvas } from './MapCanvas';
import { findPlayerTileIndex, getTiles, getTile, parse, removeEntity, Tile, moveEntity } from './MapHelpers';
import { PlayerActions } from './PlayerActions';
import { ActionKey, ActionFunction } from './PlayerActionTypes';
import mapData from './Resources/map.json'
import { Vector } from './Vector';

export {
  App
}

const actions: {[key in ActionKey]: ActionFunction} = {
  [ActionKey.Left]: makeMovePlayerFunction({x: -1, y: 0}),
  [ActionKey.Right]: makeMovePlayerFunction({x: 1, y: 0}),
  [ActionKey.Up]: makeMovePlayerFunction({x: 0, y: -1}),
  [ActionKey.Down]: makeMovePlayerFunction({x: 0, y: 1}),
}

function makeMovePlayerFunction(direction: Vector){
  return ({playerLocation, map}:{
    playerLocation: Vector, 
    map: Array<Array<Tile>>}) => {
      getPlayer(map, playerLocation)
      moveEntity(map, getPlayer(map, playerLocation), playerLocation, direction)
    } 
}

function getPlayer(map, playerLocation){
  const tile = getTile(playerLocation, map)
  return tile.entities.find((e) => e.isPlayer)
}

const spawnLocation = {x: 13, y: 14}

const defaultMap: Array<Array<Tile>> = [[
  {type: 1, entities: []}
]]
defaultMap[0][0].entities.push(Player(defaultMap[0][0]))


/**
 * The App component will handle all game state, mainly saved in the 'map' variable.
 * 
 * All subcomponents must call setMap.
 * 
 * @param props 
 * @returns 
 */
function App(props) {
  const [ map, setmap ] = useState(defaultMap)

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

  function playerChoseAction(actionKey: ActionKey){
    actions[actionKey]({playerLocation, map})
    tick(map)
    setmap([...map])
  }

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
          <MapCanvas map={submap} percentage={60} />
        </div>

        <div style={{ gridArea: "left", display: "flex", justifyContent: "center" }}>
          <MapCanvas map={submap} percentage={30} />
        </div>

        <div style={{ gridArea: "footer", display: "flex", justifyContent: "center" }}>
          <PlayerActions tile={getTile(playerLocation, map)} playerChoseAction={playerChoseAction}/>
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

function tick(map: Array<Array<Tile>>){

}

