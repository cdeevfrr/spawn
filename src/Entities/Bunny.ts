import { Entity, Tile } from "../MapHelpers";

export { Bunny }

function Bunny(location: Tile): Entity{
    return {
        container: location,
        imageLookupKey: "bunnySvg",
        id: Math.random().toString(),
        displayName: "Fanged Bunny",
      }
}