export {
    Vector,
    VectorPlus,
    VectorMaxDistance,
}

interface Vector{
    x: number,
    y: number
}

function VectorPlus(a: Vector, b: Vector){
    return {x: a.x + b.x, y: a.y + b.y}
}

function VectorMaxDistance(a: Vector, b:Vector){
    return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y))
}

