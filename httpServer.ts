import http from 'http';
import fs from 'fs';
import path from 'path';
import mime from 'mime';

const onStartResolves: Array<() => void> = [];
var startResolved: boolean = false;
export function init(): void {

}
export function onStart(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        if (startResolved) return resolve();
        onStartResolves.push(resolve);
    })
}
export const server = http.createServer((req, res) => {
    if (!req.url) return;
    if (req.url?.endsWith("/")) req.url += "index.html";
    const url = req.url.split('?')[0];
    if (!fs.existsSync(path.join(__dirname, "./web/", url))) {
        res.writeHead(404);
        res.end(fs.readFileSync(path.join(__dirname, "./web/404.html")).toString().replace("${fileurl}", url));
        return;
    }

    
    res.setHeader('Content-Type', mime.getType(url) ?? "text/plain");
    res.writeHead(200);
    res.end(fs.readFileSync(path.join(__dirname, "./web/", url)).toString().replace("${fileurl}", url))
});

server.listen(4205, () => {
    for (var l of onStartResolves) {
        l();
    }
    startResolved = true;
})