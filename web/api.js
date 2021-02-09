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
    }
}