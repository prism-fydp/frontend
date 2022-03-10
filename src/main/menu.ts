import {
  Menu,
  shell,
  BrowserWindow,
  MenuItemConstructorOptions,
  dialog,
  app,
} from 'electron';
import { addIPFS, getIPFS, pingIPFS, setIPFS } from './ipfs/ipfs';
import { read } from './utils/file_io';

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu(): Menu {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template = this.buildTemplate();
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    return menu;
  }

  setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  buildTemplate(): MenuItemConstructorOptions[] {
    const isDarwin = process.platform === 'darwin';

    const appSubMenu: MenuItemConstructorOptions[] = isDarwin
      ? [
          {
            role: 'appMenu',
            label: app.name,
            submenu: [
              { role: 'about' },
              { type: 'separator' },
              { role: 'services', submenu: [] },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'unhide' },
              { role: 'hideOthers' },
              { type: 'separator' },
              { role: 'quit' },
            ],
          },
        ]
      : [];

    const fileSubMenu: MenuItemConstructorOptions = {
      role: 'fileMenu',
      submenu: [
        {
          label: '&Open',
          accelerator: isDarwin ? 'Command+O' : 'Ctrl+O',
          click: () => this.openFile(),
        },
        {
          label: '&Save',
          accelerator: isDarwin ? 'Command+S' : 'Ctrl+S',
          click: () => this.mainWindow.webContents.send('file:save'),
        },
        {
          label: '&Save As',
          accelerator: isDarwin ? 'Command+Shift+S' : 'Ctrl+Shift+S',
          click: () => this.selectSavePath(),
        },
      ],
    };

    const editSubMenu: MenuItemConstructorOptions = {
      role: 'editMenu',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteAndMatchStyle' },
        { type: 'separator' },
        { role: 'selectAll' },
      ],
    };

    const viewSubMenu: MenuItemConstructorOptions = {
      role: 'viewMenu',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    };

    const windowSubMenu: MenuItemConstructorOptions = {
      role: 'windowMenu',
      submenu: [
        { role: 'minimize' },
        { type: 'separator' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { role: 'resetZoom' },
        { type: 'separator' },
        { role: 'close' },
      ],
    };

    const ipfsSubMenu: MenuItemConstructorOptions = {
      label: 'IPFS',
      submenu: [
        { label: 'Ping', click: () => this.pingIPFS() },
        { label: 'Add', click: () => this.addIPFS() },
        { label: 'Get', click: () => this.getIPFS() },
        {
          label: 'Set',
          click: () => setIPFS('IPFS:DataStore:StorageMax', '10GB'),
        },
      ],
    };

    const helpSubMenu: MenuItemConstructorOptions = {
      role: isDarwin ? 'help' : undefined,
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click: () => shell.openExternal('https://github.com/prism-fydp'),
        },
      ],
    };

    return [
      ...appSubMenu,
      fileSubMenu,
      editSubMenu,
      viewSubMenu,
      windowSubMenu,
      ipfsSubMenu,
      helpSubMenu,
    ];
  }

  private openFile(): void {
    dialog
      .showOpenDialog(this.mainWindow, { properties: ['openFile'] })
      .then((choice) =>
        choice.canceled ? Promise.reject() : choice.filePaths[0]
      )
      .then((filePath) => {
        const fileInfo = { data: read(filePath), filePath };
        return this.mainWindow.webContents.send('file:open', fileInfo);
      })
      .catch(() => {});
  }

  private selectSavePath(): void {
    dialog
      .showSaveDialog(this.mainWindow, { properties: ['createDirectory'] })
      .then((choice) =>
        choice.canceled || !choice.filePath ? Promise.reject() : choice.filePath
      )
      .then((filePath) =>
        this.mainWindow.webContents.send('file:save', filePath)
      )
      .catch(() => {});
  }

  private pingIPFS(): void {
    pingIPFS()
      .then((res) =>
        dialog.showMessageBox(this.mainWindow, {
          message: `IPFS Ping Result: ${res ? 'Success' : 'Fail'}`,
          type: 'info',
          title: 'IPFS Ping',
        })
      )
      .catch((err) =>
        dialog.showErrorBox(
          'IPFS Ping Error',
          `Confirm that the IPFS daemon is running.\n${err}`
        )
      );
  }

  private addIPFS(): void {
    dialog
      .showOpenDialog(this.mainWindow, { properties: ['openFile'] })
      .then((choice) =>
        choice.canceled ? Promise.reject() : addIPFS(choice.filePaths[0])
      )
      .then((res) =>
        dialog.showMessageBox(this.mainWindow, {
          message: `IPFS added file with CID ${res}`,
          type: 'info',
          title: 'IPFS Add',
        })
      )
      .catch((err) =>
        dialog.showErrorBox(
          'IPFS Add Error',
          `Confirm that the IPFS daemon is running.\n${err}`
        )
      );
  }

  private getIPFS(): void {
    dialog
      .showOpenDialog(this.mainWindow, {
        properties: ['openDirectory', 'createDirectory'],
      })
      .then((choice) =>
        choice.canceled || !choice.filePaths[0].length
          ? Promise.reject()
          : getIPFS(
              'QmUaoioqU7bxezBQZkUcgcSyokatMY71sxsALxQmRRrHrj',
              choice.filePaths[0]
            )
      )
      .then((res) =>
        dialog.showMessageBox(this.mainWindow, {
          message: `Downloaded content from IPFS. Saved as: ${res}`,
          type: 'info',
          title: 'IPFS Get',
        })
      )
      .catch((err) =>
        dialog.showErrorBox(
          'IPFS Get Error',
          `Confirm that the IPFS daemon is running.\n${err}`
        )
      );
  }
}
