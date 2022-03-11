import { BrowserWindow, dialog, ipcMain } from 'electron';
import { read, write } from './file_io';
import { READ_DIR, WRITE_DIR } from './paths';
import { addIPFS, getIPFS, setIPFS } from '../ipfs/ipfs';
import openPaymentPage from '../pages/payment';

function setupFileIPC(window: BrowserWindow) {
  ipcMain.on('file:open', async (event, arg) => {
    if (typeof arg === 'string') {
      const fileData = read(arg);
      event.reply('file:open', { filePath: arg, data: fileData });
    }
  });

  ipcMain.on('file:save', async (_, { data, filePath }) => {
    let savePath = typeof filePath === 'string' ? filePath : '';

    // If the provided filePath to save to is invalid, then this is the first
    // save for this document. Open a new save dialog to determine where the user
    // wants to save to.
    if (!savePath.length) {
      savePath = await dialog
        .showSaveDialog({ properties: ['createDirectory'] })
        .then((choice) => {
          return choice.canceled || !choice.filePath ? '' : choice.filePath;
        })
        .catch(() => '');

      // The path to save this file to was set by the above dialog. Inform the
      // renderer of this file path.
      if (savePath.length && window) {
        window.webContents.send('file:set-path', savePath);
      }
    }

    // Save the file
    if (savePath.length) {
      write(savePath, data);
    }
  });
}

function setupBrowserIPC() {
  ipcMain.on('pay', (_, addr) => {
    openPaymentPage(addr);
  });
}

function setupIpfsIPC(window: BrowserWindow) {
  ipcMain.on('ipfs:get', async (event, cid) => {
    getIPFS(cid, READ_DIR)
      .then((path) => {
        return typeof path === 'string'
          ? event.reply('file:open', { filePath: path, data: read(path) })
          : Promise.reject();
      })
      .catch(() =>
        event.reply('file:open', { filePath: '', data: 'Failed to download' })
      );
  });

  ipcMain.on('ipfs:setting-update', (_, params) => {
    setIPFS(params.settingKey, params.updatedValue);
  });

  ipcMain.on('ipfs:add', async (_, { data, filePath }) => {
    let savePath = typeof filePath === 'string' ? filePath : '';

    if (!savePath.length) {
      savePath = await dialog
        .showSaveDialog({
          properties: ['createDirectory'],
          defaultPath: WRITE_DIR,
        })
        .then((choice) =>
          choice.canceled || !choice.filePath ? '' : choice.filePath
        )
        .catch(() => '');

      if (savePath.length && window) {
        window.webContents.send('file:set-path', savePath);
      }
    }

    if (savePath.length) {
      write(savePath, data);
      addIPFS(savePath)
        .then((cid) => window.webContents.send('ipfs:added', cid))
        .catch(() => window.webContents.send('ipfs:added', ''));
    }
  });
}

export default function setupIPC(window: BrowserWindow) {
  setupFileIPC(window);
  setupBrowserIPC();
  setupIpfsIPC(window);
}
