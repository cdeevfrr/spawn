import React, { useEffect, useState } from 'react';
import '../App.css';
import { Bunny } from '../Entities/Bunny';
import { makePlayer } from '../Entities/Player';
import { MapCanvas } from './MapCanvas';
import { findPlayer, getTiles, getTile, parse, teleportEntity } from '../Model/MapHelpers';
import { Tile } from '../Model/Tile';
import { Entity, getEffectiveSpeed, isDead } from '../Entities/Entity';
import { PlayerActions } from './PlayerActions';
import { ActionKey, moveActionKeys } from '../Model/ActionTypes';
import mapData from '../Resources/map.json'
import { Vector } from '../Model/Vector';
import { GrouchyWolf } from '../Entities/GrouchyWolf';
import { EventLog } from './EventLog';
import { PlayerInfoComponent } from './PlayerInfoComponent';
import { performAction } from '../Model/PerformAction';
import { entityActions } from '../Model/EntityActions';
import { EventStack, Phase } from '../Model/EventStack';

export {
  App,
}

const spawnLocation: Vector = {x: 13, y: 14}

const defaultMap: Array<Array<Tile>> = [[
  {type: 1, entities: []}
]]
defaultMap[0][0].entities.push(makePlayer({x: 0, y: 0}))


/**
 * The App component will handle all game state, mainly saved in the 'map' variable.
 * 
 * All subcomponents must call setMap.
 * 
 * @returns 
 */
function App() {
  const [ map, setmap ] = useState(defaultMap)
  const [eventLog, setEventLog] = useState([[]])

  let player: Entity = findPlayer(map)

  useEffect(() => { // load the map from file only on first load
    const loadedMap = parse(mapData)

    player = findPlayer(loadedMap)
    if (player === null){
      player = respawnPlayer(loadedMap)
    }

    const bunnyTile = loadedMap[13][12]
    bunnyTile.entities.push(Bunny({x: 12, y: 13}))
    bunnyTile.entities.push(Bunny({x: 12, y: 13}))
    bunnyTile.entities.push(Bunny({x: 12, y: 13}))
    bunnyTile.entities.push(Bunny({x: 12, y: 13}))

    const wolfTile = loadedMap[13][11]
    wolfTile.entities.push(GrouchyWolf({y: 13, x: 11}))
    wolfTile.entities.push(GrouchyWolf({y: 13, x: 11}))

    setmap(loadedMap)
  }, []) 

  const submap = getTiles(map, player.location)

  const eventStack = new EventStack()

  function playerChoseAction(actionKey: ActionKey, extraData?: any){
    eventStack.addAction({
      action: actionKey,
      actor: player,
      actorLocation: player.location,
      map,
      speed: getEffectiveSpeed(player),
      occurIfDead: false,
      occurIfStunned: false,
      target: extraData?.target
    }, Phase.mainPhase)

    queueAllEntityActions(map, eventStack)
    const actionResults = eventStack.tick(map)

    eventLog.push(actionResults)

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
          <PlayerActions playerChoseAction={playerChoseAction}/>
        </div>
        <div style={{ gridArea: "left", display: "flex", justifyContent: "center", width: "100%", height: "100%" }}>
          <EventLog log={eventLog} playerLocation={player.location}/>
        </div>

        <div style={{ gridArea: "footer", display: "flex", justifyContent: "center",}}>
          <PlayerInfoComponent playerTile={getTile(player.location, map)} player={player} playerChoseAction={playerChoseAction}/>
        </div>


      </div>

    </div>
  );
}

function respawnPlayer(map: Array<Array<Tile>>): Entity{
  let player = findPlayer(map)
  if (player){
    teleportEntity(map, player, spawnLocation)
  } else {
    const tile = map[spawnLocation.y][spawnLocation.x]
    tile.entities.push(makePlayer(spawnLocation))
  }
  return player
}

function queueAllEntityActions(map: Array<Array<Tile>>, eventStack: EventStack){
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
            eventStack.addAction({
              action: desiredAction.action,
              target: desiredAction.target,
              actor: entity,
              actorLocation: entity.location,
              map,
              speed: getEffectiveSpeed(entity),
            }, Phase.mainPhase)
          }
        }
      }
    }
  }

}

