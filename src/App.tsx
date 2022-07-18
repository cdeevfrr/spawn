import React, { useEffect, useState } from 'react';
import './App.css';
import { Bunny, bunnyAction } from './Entities/Bunny';
import { makePlayer } from './Entities/Player';
import { MapCanvas } from './MapCanvas';
import { findPlayerTileIndex, getTiles, getTile, parse, removeEntity, moveEntity } from './MapHelpers';
import { Tile } from './Tile';
import { ChooseActionFunction, isDead } from './Entities/Entity';
import { PlayerActions } from './PlayerActions';
import { ActionKey, moveActionKeys } from './ActionTypes';
import mapData from './Resources/map.json'
import { Vector } from './Vector';
import { GrouchyWolf, grouchyWolfAction } from './Entities/GrouchyWolf';
import { EventLog } from './EventLog';
import { PlayerInfoComponent } from './PlayerInfoComponent';
import { EventLogType, performAction } from './PerformAction';

export {
  App,
}

const entityActions: {[key: string]:ChooseActionFunction} = {
  "Fanged Bunny": bunnyAction,
  "Grouchy Wolf": grouchyWolfAction
}

function getPlayer(map: Array<Array<Tile>>, playerLocation: Vector){
  const tile = getTile(playerLocation, map)
  return tile.entities.find((e) => e.isPlayer)
}

const spawnLocation = {x: 13, y: 14}

const defaultMap: Array<Array<Tile>> = [[
  {type: 1, entities: []}
]]
defaultMap[0][0].entities.push(makePlayer(defaultMap[0][0]))


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
  const [eventLog, setEventLog] = useState([[]])

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

    const wolfTile = loadedMap[13][11]
    wolfTile.entities.push(GrouchyWolf(wolfTile))
    wolfTile.entities.push(GrouchyWolf(wolfTile))


    loadedMap[playerLocation.y][playerLocation.x].type = 2
    bunnyTile.type = 2


    setmap(loadedMap)
  }, []) 

  const submap = getTiles(map, playerLocation)

  function playerChoseAction(actionKey: ActionKey, extraData?: any){
    playerLocation = performAction({
      map,
      entity: getPlayer(map, playerLocation),
      entityLocation: playerLocation,
      action: actionKey,
      target: extraData?.target,
    }, eventLog)
    tick(map, eventLog)
    setmap([...map])
    setEventLog([...eventLog])
  }

  return (
    <div className="App">
      <div style={{
        display: "grid", 
        gridTemplateAreas: `
          'header header header header header header' 
          'left middle middle middle middle right' 
          'footer footer footer footer footer footer'`,
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
        }}>

        <div style={{gridArea: "header", height: "10vh"}} className = "App-header">
          <p>
            Spawn
          </p>
        </div>

        <div style={{ gridArea: "middle", display: "flex", justifyContent: "center" }}>
          <MapCanvas map={submap} percentage={60} />
        </div>

        <div style={{ gridArea: "right", display: "flex", justifyContent: "center", width: "20vw" }}>
          <PlayerActions tile={getTile(playerLocation, map)} playerChoseAction={playerChoseAction}/>
        </div>
        <div style={{ gridArea: "left", display: "flex", justifyContent: "center", width: "100%", height: "100%" }}>
          <EventLog log={eventLog} playerLocation={playerLocation}/>
        </div>

        <div style={{ gridArea: "footer", display: "flex", justifyContent: "center",}}>
          <PlayerInfoComponent playerTile={getTile(playerLocation, map)} player={getPlayer(map, playerLocation)}/>
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
  tile.entities.push(makePlayer(tile))
  return spawnLocation
}

function tick(map: Array<Array<Tile>>, eventLog: EventLogType){
  const moveActions = [] // Save up all move actions for this tick
  // that way we don't, say, move an entity to the right and then move it again later.
  for(let y = 0; y < map.length; y ++){
    for (let x = 0; x < map[y].length; x++){
      const tile = map[y][x]

      for(const entity of tile.entities){
        // Let this entity pick what it wants to do based on the tiles around it.
        // Add "() => performAction(itsChoice)"" to the list of things to do this tick.

        const actionFunction = entityActions[entity.displayName]

        if(actionFunction){
          const desiredAction = actionFunction(entity,getTiles(map, {x, y}, 1) )
          if (desiredAction){
            if (desiredAction.action in moveActionKeys){
              moveActions.push(()=> {
                !isDead(entity) && // Necessary because another entity might kill this one but the callback would still be in the move stack, which could revive this entity.
                performAction({
                  entity,
                  map,
                  entityLocation: {x,y},
                  action: desiredAction.action,
                  target: desiredAction.target,
                }, eventLog)
              })
            } else {
              // non-move actions, like attacks, should happen immediately.
              // That way one thing can kill another without itself dying first.
              // Note that the longer you're on a tile, the earlier you get to move,
              // since entities entering a tile are inserted at the back.
              performAction({
                entity,
                map,
                entityLocation: {x,y},
                action: desiredAction.action,
                target: desiredAction.target,
              }, eventLog)
            }
          }
        }
      }
    }
  }



  for (const action of moveActions){
    action()
  }

  if(eventLog.length > 1000){
    eventLog.splice(-1000)
  }

  eventLog.push([])
}

