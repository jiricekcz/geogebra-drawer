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
        on(event: "fileUpdate", listener: (file: ggbFile) => void);
        emit(event: "fileUpdate", file: ggbFile): void;
    }
    declare interface EventListeners {
        fileUpdate: Array<(file: ggbFile) => void>;
    }
    declare class ggbFile {
        constructor(jsonFile: any);
    }
}
export = API;