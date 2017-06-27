console.log('test')
import { addPath } from 'app-module-path';
import path from 'path';

console.log(path.join(__dirname, '..', '/src'))

addPath(path.join(__dirname, '..', ''));
addPath(path.join(__dirname, '..', '/src'));
