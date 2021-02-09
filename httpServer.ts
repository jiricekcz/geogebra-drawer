import http from 'http';
import fs from 'fs';
import path from 'path';

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
    res.writeHead(200, "content-type: text/html");
    res.end(fs.readFileSync(path.join(__dirname, "./web/", url)).toString().replace("${fileurl}", url))
});

server.listen(4205, () => {
    for (var l of onStartResolves) {
        l();
    }
    startResolved = true;
})