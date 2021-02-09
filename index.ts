import childProcess from 'child_process';
import * as socketServer from './wsServer';
import * as httpServer from './httpServer';
import * as fileListener from './fileListener';
import geogebraParser from './geogebraParser';

async function main() {
    console.log("Server script started.");
    await socketServer.onStart();
    console.log("Websocket server running...");
    socketServer.onEnd().then(() => {
        console.log("Server stopped.");
    })
    await httpServer.onStart();
    console.log("Http server running...");
    console.log("Opening browser tab...");
    await wait(1000);
    childProcess.execSync("start http://localhost:4205/")
    console.log("Browser tab opened.");
    await wait(2000);
    console.log("Starting file listener...");
    fileListener.onFileChange("./ggbFile/geogebra-export.ggb", async buf => {
        let parsed = await geogebraParser("./ggbFile/geogebra-export.ggb");
        socketServer.sockets.emitEvent("fileUpdate", {timestamp: Date.now(), file: parsed});
    })
}
function wait(ms: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => { resolve() }, ms);
    })
} 
main();