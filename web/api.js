export class Shard {
    constructor() {
        this.socket = new WebSocket("ws://localhost:3000");
        this.eventOns = {};
        this.socket.onmessage = message => {
            const d = JSON.parse(message.data);
            switch (d.type) {
                case "event": this.emit(d.event.name, { timestamp: d.event.data.timestamp, file: new ggbFile(d.event.data.file) });
            }
        }
    }
    emit(event, ...a) {
        if (!(this.eventOns[event] instanceof Array)) this.eventOns[event] = [];
        for (var l of this.eventOns[event]) {
            l(...a);
        }
    }
    on(event, fc) {
        if (!(this.eventOns[event] instanceof Array)) this.eventOns[event] = [];
        this.eventOns[event].push(fc);
    }
}
export class ggbFile {
    constructor(json) {
        this.scale = {
            x: json.xScale,
            y: json.yScale
        }
        this.zero = {
            x: json.xZero,
            y: json.yZero
        }
        this.points = [];
        for (var el of json.elements) {
            if (el.type === "point") {
                this.points.push(new Point(el.x, el.y, el.label));
            }
        }
        this.commands = [];
        for (var cmd of json.commands) {
            this.commands.push(new Command(cmd.type, cmd.inputs, cmd.outputs));
        }
        this.labels = [];
        for (var label of json.labels) {
            this.labels.push(label);
        }
    }
}
export class Point {
    constructor(x, y, l) {
        this.x = x;
        this.y = y;
        this.label = l;
    }
}
export class Command {
    constructor(name, inputs, outputs) {
        this.name = name;
        this.inputs = inputs;
        this.outputs = outputs;
    }
}