import ws from 'ws';
import { SocketManager } from './socketmanager';

const onStartResolves: Array<() => void> = [];
var startResolved: boolean = false;
const onEndResolves: Array<() => void> = [];
var endResolved: boolean = false;
export function init(): void {
    
}
export const server = new ws.Server({
    port: 3000
});
export const sockets = new SocketManager();
server.on("listening", () => {
    for (var l of onStartResolves) {
        l();
    }
    startResolved = true;
});
server.on("close", () => {
    for (var l of onEndResolves) {
        l();
    }
    endResolved = true;
});
export function onEnd(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        if (endResolved) return resolve();
        onEndResolves.push(resolve);
    })
}
export function onStart(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        if (startResolved) return resolve();
        onStartResolves.push(resolve);
    })
}

server.on("connection", (socket) => {
    sockets.addSocket(socket);
});