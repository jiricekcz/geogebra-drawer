import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

export const listens: any = {};
export const lastHash: any = {};
export function init(): void {

}
export function onFileChange(filename: string, callback: (file: Buffer) => void): void {
    if (!listens[filename]) listens[filename] = [];
    listens[filename].push(callback);
}
function emitChange(filename: string, file: Buffer): void {
    if (!listens[filename]) listens[filename] = [];
    for (var h of listens[filename]) {
        h(file);
    }
}
function update() {
    for (const filename in listens) {
        if (!fs.existsSync(path.join(__dirname, filename))) continue;
        const hash = crypto.createHash("sha256").update(fs.readFileSync(path.join(__dirname, filename))).digest("base64");
        if (hash == lastHash[filename]) continue;
        lastHash[filename] = hash;
        emitChange(filename, fs.readFileSync(path.join(__dirname, filename)));
    }
}
setInterval(update, 1000 / 30);