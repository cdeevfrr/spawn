
import { Tile } from "../Tile"  

export {Entity, Stats}

interface Entity {
    container: Tile,
    isPlayer?: boolean
    imageLookupKey: string
    id: string,
    displayName: string,
    stats: Stats
    buffs: Array<Buff>
}

interface Stats{
    health: Bar,
    mana: Bar,
    will: Bar,
    strength: number,
    magic: number,
    stamina: number,
}

interface Bar{
    current: number,
    max: number,
}

type Buff = {
    [key in keyof Stats]: number
} & {timeout: number}