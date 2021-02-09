import ws from 'ws';
import { ggbFile } from './types.d';

export class SocketManager {
    readonly sockets: Array<ws>;
    constructor() {
        this.sockets = [];
    }
    addSocket(socket: ws): void {
        this.sockets.push(socket);
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
}
export type event = "fileUpdate";
export declare interface fileUpdateEventData {
    timestamp: number;
    file: ggbFile;
}
