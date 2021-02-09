import ws from 'ws';
import { ggbFile } from './types.d';

export default class SocketManager extends Array<ws> {
    readonly onSocket: (socket: ws) => void;
    constructor(onSocket: (socket?: ws) => void = () => {}) {
        super();
        this.onSocket = onSocket;
    }
    addSocket(socket: ws): void {
        this.push(socket);
        this.onSocket(socket);
    }
    sendAll(data: any): void {
        for (const s of this) {
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
