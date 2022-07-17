export {
    Vector,
    VectorPlus
}

interface Vector{
    x: number,
    y: number
}

function VectorPlus(a: Vector, b: Vector){
    return {x: a.x + b.x, y: a.y + b.y}
}

