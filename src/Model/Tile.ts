import { Entity } from "../Entities/Entity"

export {Tile}

interface Tile {
    type: number,
    entities: Array<Entity>
}