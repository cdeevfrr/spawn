import { canvasId } from "./sharedConstants"

export { gameMainLoop }

async function gameMainLoop(){
    const mapData = await (await fetch('/Resources/map.json')).text()
    const map = JSON.parse(mapData)

    const canvas = document.getElementById(canvasId)

}