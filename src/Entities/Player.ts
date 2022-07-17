import { Entity, Tile } from "../MapHelpers";

export { Player }

function Player(location: Tile): Entity{
    return {
        container: location,
        imageLookupKey: "playerCharacterSvg",
        isPlayer: true,
        id: Math.random().toString()
      }
}