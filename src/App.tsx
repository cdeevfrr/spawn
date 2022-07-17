import React, { useEffect, useState } from 'react';
import './App.css';
import { MapCanvas } from './MapCanvas';
import { findPlayerTileIndex, getTiles, parse } from './MapHelpers';
import mapData from './Resources/map.json'

export {
  App
}

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
      playerLocation = {x: 13, y: 14}
      loadedMap[playerLocation.y][playerLocation.x].entities.push(
        {
          container: loadedMap[playerLocation.y][playerLocation.x],
          imageLookupKey: "playerCharacterSvg",
          isPlayer: true,
        }
      )
    }
    setmap(loadedMap)
  }, []) 

  const submap = getTiles(map, playerLocation)

  return (
    <div className="App">
      <header className="App-header" style= {{height: "10vh"}}>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <div style = {{display: "flex", justifyContent: "center" }}>
        <MapCanvas map={submap} />
      </div>
    </div>
  );
}
