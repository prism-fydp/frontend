import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';

const ENCODING = 'utf-8';

/*
 * Read the contents of a file given its path
 */
export const read = (filePath: string) => {
  // Sanitize the input
  if (!filePath) {
    return '';
  }

  // Get the absolute path to the file
  const absPath = resolve(filePath);

  // Read the file and return the read data
  return existsSync(absPath)
    ? readFileSync(absPath, { encoding: ENCODING })
    : '';
};

/*
 * Creates a directory if it does not already exist
 */
export const createDir = (path: string) => {
  const absPath = resolve(path);
  if (!existsSync(absPath)) {
    mkdirSync(absPath, { recursive: true });
  }
};

/*
 * Write data to the file at the given path. Defaults to 'w' mode, but can be
 * set to 'a' for append
 */
export const write = (filePath: string, data: string, flag = 'w') => {
  // Sanitize the input
  if (!filePath || !data) {
    return;
  }

  // Get the abolute path to the file
  const absPath = resolve(filePath);

  // Create the directory if it does not exist
  const dir = dirname(absPath);
  createDir(dir);

  // Write to the file
  writeFileSync(absPath, data, { encoding: ENCODING, flag });
};
