import { assert } from 'console';
import { readdirSync, statSync, readFileSync } from 'fs'
import { join } from 'path'

const isDirectory = (path: string) => statSync(path).isDirectory();
const getDirectories = (path: string) =>
  readdirSync(path).map(name => join(path, name)).filter(isDirectory);

const isFile = (path: string) => statSync(path).isFile();
const getFiles = (path: string) =>
  readdirSync(path).map(name => join(path, name)).filter(isFile);

export const getFilesRecursively = (path: string): string[] => {
  let dirs = getDirectories(path);
  let files = dirs
    .map(dir => getFilesRecursively(dir)) // go through each directory
    .reduce((a, b) => a.concat(b), []);    // map returns a 2d array (array of file arrays) so flatten
  return files.concat(getFiles(path));
};

export const readFileAsString = (path: string): string => {
  assert(isFile(path), "Can't read directory.");
  return readFileSync(path, 'utf8');
}
