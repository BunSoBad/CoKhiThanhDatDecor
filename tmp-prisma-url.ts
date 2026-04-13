import path from 'path';
import { pathToFileURL } from 'url';
const url = pathToFileURL(path.join(process.cwd(), 'dev.db')).href;
console.log(url);
console.log(path.join(process.cwd(), 'dev.db'));
