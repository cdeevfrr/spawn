import React, { useEffect, useState } from 'react';
import './App.css';
import { MapCanvas } from './MapCanvas';
import { Tile, getTiles } from './MapHelpers';
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

  useEffect(() => setmap(mapData.map(row =>
    row.map(pseudoTile => {
      const newTile: Tile = {type: pseudoTile.t}
      return newTile
    }))
    ), []) // set the map only on first load

  const playerLocation = {x: 14, y: 14}
  const submap = getTiles(map, playerLocation)


  return (
    <div className="App">
      <header className="App-header" style= {{height: "15vh"}}>
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
