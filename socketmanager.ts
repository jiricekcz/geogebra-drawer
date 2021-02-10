import ws from 'ws';
import { ggbFile } from './types.d';

export class SocketManager {
    readonly sockets: Array<ws>;
    readonly listeners: any;
    constructor() {
        this.sockets = [];
        this.listeners = {};
    }
    addSocket(socket: ws): void {
        this.sockets.push(socket);
        this.emit("new");
    }
    sendAll(data: any): void {
        for (const s of this.sockets) {
            s.send(JSON.stringify(data));
        }
    }
    emitEvent(event: "fileUpdate", data: fileUpdateEventData): void;
    emitEvent(event: event, data: any): void {
        this.sendAll({
            type: "event",
            event: {
                name: event,
                data
            }
        });
    }
    emit(event: "new"): void;
    emit(event: string, ...args: any[]): void {
        for (var h of this.listeners[event]) {
            h(...args);
        } 
    }

    on(event: "new", callback: () => void): void;
    on(event: string, callback: (...args: any[]) => void): void {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    } 
}
export type event = "fileUpdate";
export declare interface fileUpdateEventData {
    timestamp: number;
    file: ggbFile;
}
