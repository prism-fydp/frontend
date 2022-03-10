import { app } from 'electron';
import path from 'path';
import { createDir } from './file_io';

export const DOCS_DIR = path.join(app.getPath('documents'), 'Prism');
export const READ_DIR = path.join(DOCS_DIR, 'reading');
export const WRITE_DIR = path.join(DOCS_DIR, 'writing');

export const DATA_DIR = app.getPath('userData');
export const SETTINGS_PATH = path.join(DATA_DIR, 'config.json');

export function initializePaths() {
  createDir(READ_DIR);
  createDir(WRITE_DIR);
}
