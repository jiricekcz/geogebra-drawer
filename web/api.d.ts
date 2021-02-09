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
        readonly points: Array<Point>;
        readonly commands: Array<Command>;
        readonly labels: Array<Label>;
        constructor(jsonFile: any);
    }
    /**
     * An interface for a 2D Vector
     */
    declare interface Vector2D<X, Y> {
        x: X;
        y: Y;
    }
    /**
     * Class representing a point, that should be drawn on the canvas
     */
    declare class Point {
        readonly x: number;
        readonly y: number;
        readonly label: Label;
        constructor(x: number, y: number, label: Label);
    }
    /**
     * Class representing a command used to creeate more elements
     */
    declare interface Command {
        readonly name: string;
        readonly inputs: Array<Label>;
        readonly outputs: Array<Label>;
    }
    declare type Label = string;
}
export = API;