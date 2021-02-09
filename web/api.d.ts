declare namespace API {
    /**
     * The basic object used to interact with the API
     */
    declare class Shard {
        readonly socket: Websocket;
        /**
         * Creates the API.Shard object
         * @example 
         * const shard = new API.Shard();
         */
        readonly eventOns: eventListeners;
        constructor();
        /**
         * Event emited when the ggb file has changed
         * @param event The event name 
         * @param listener The function that should be executed when the event occurs
         * @example
         * const sahrd = new API.Shard();
         * 
         * shard.on("fileUpdate", event => {
         *      console.log(new Date(event.timestamp));
         * });
         */
        on(event: "fileUpdate", listener: (file: ggbFileUpdateEvent) => void);
        emit(event: "fileUpdate", file: ggbFileUpdateEvent): void;
    }
    declare interface EventListeners {
        fileUpdate: Array<(file: ggbFileUpdateEvent) => void>;
    }
    /**
     * Event emited when the ggb file has changed
     */
    declare interface ggbFileUpdateEvent {
        /**
         * The time when the file was changed
         */
        timestamp: number;
        /**
         * The file itself
         */
        file: ggbFile;
    }
    declare class ggbFile {
        readonly scale: Vector2D<number, number>;
        readonly zero: Vector2D<number, number>;
        constructor(jsonFile: any);

    }
    declare interface Vector2D<X, Y> {
        x: X;
        y: Y;
    }
}
export = API;