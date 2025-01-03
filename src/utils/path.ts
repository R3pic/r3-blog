import path from 'path';
import fs from 'fs';

export function getPostDir(postDir: string = '_posts') {
    return path.resolve(postDir);
}

export function isExist(path: string) {
    return fs.existsSync(path);
}