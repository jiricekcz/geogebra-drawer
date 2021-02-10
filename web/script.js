import * as API from './api.js';
import * as cio from './canvasio/index.js'

const shard = new API.Shard();
const sM = 5; // Scale multiplier
var canvas;
var canvasData;

shard.on("fileUpdate", e => {
    canvasData = e;
    window.canvasData = canvasData;
    setup();
});

function setup() {
    canvas = new cio.Canvas({ preset: 'fullscreen' });

    canvas.translate(canvasData.file.zero.x, canvasData.file.zero.y);
    canvas.scale(canvasData.file.scale.x, -canvasData.file.scale.y)

    canvas.setLineCap("round");
    console.log(pxToScale(3))
    canvas.setLineWidth(pxToScale(3));
    canvas.setStroke("rgb(0,0,0)");

    for (var p of canvasData.file.points) {
        var margin = 0.1 + Math.random() / 10;

        canvas.drawLine(p.x + margin, p.y + margin, p.x - margin, p.y - margin);
        canvas.drawLine(p.x - margin, p.y + margin, p.x + margin, p.y - margin);
    }

    console.log("Canvas created", window.canvasData)
}

function pxToScale(pixels) {
    return (pixels * 0.5 / (canvasData.file.scale.x + canvasData.file.scale.y))
}