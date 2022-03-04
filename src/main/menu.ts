import {
  app,
  Menu,
  shell,
  BrowserWindow,
  MenuItemConstructorOptions,
  dialog,
} from 'electron';
import { addIPFS, getIPFS, pingIPFS } from './ipfs/ipfs';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

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

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

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

  buildDarwinTemplate(): MenuItemConstructorOptions[] {
    const subMenuAbout: DarwinMenuItemConstructorOptions = {
      label: '&File',
      submenu: [
        {
          label: '&Open',
          accelerator: 'Ctrl+O',
          click: () => {
            dialog
              .showOpenDialog(this.mainWindow, { properties: ['openFile'] })
              .then((choice) => {
                return choice.canceled ? Promise.reject() : choice.filePaths[0];
              })
              .then((filePath) => {
                const data = read(filePath);
                this.mainWindow.webContents.send('open-file', {
                  data,
                  filePath,
                });
                return true;
              })
              .catch(console.error);
          },
        },
        {
          label: '&Save',
          accelerator: 'Ctrl+S',
          click: () => {
            console.log('Save');
            this.mainWindow.webContents.send('save-file', '');
          },
        },
        {
          label: '&Save As',
          accelerator: 'Ctrl+Shift+S',
          click: () => {
            console.log('Save As');
            dialog
              .showSaveDialog(this.mainWindow, {
                properties: ['createDirectory'],
              })
              .then((choice) => {
                return choice.canceled ? Promise.reject() : choice.filePath;
              })
              .then((filePath) => {
                this.mainWindow.webContents.send('save-file', filePath);
                return true;
              })
              .catch(console.error);
          },
        },
        {
          label: '&Close',
          accelerator: 'Ctrl+W',
          click: () => {
            this.mainWindow.close();
          },
        },
      ],
    };

    const subMenuView: DarwinMenuItemConstructorOptions = {
      label: '&View',
      submenu:
        process.env.NODE_ENV === 'development' ||
        process.env.DEBUG_PROD === 'true'
          ? [
              {
                label: '&Reload',
                accelerator: 'Ctrl+R',
                click: () => {
                  this.mainWindow.webContents.reload();
                },
              },
              {
                label: 'Toggle &Full Screen',
                accelerator: 'F11',
                click: () => {
                  this.mainWindow.setFullScreen(
                    !this.mainWindow.isFullScreen()
                  );
                },
              },
              {
                label: 'Toggle &Developer Tools',
                accelerator: 'Alt+Ctrl+I',
                click: () => {
                  this.mainWindow.webContents.toggleDevTools();
                },
              },
            ]
          : [
              {
                label: 'Toggle &Full Screen',
                accelerator: 'F11',
                click: () => {
                  this.mainWindow.setFullScreen(
                    !this.mainWindow.isFullScreen()
                  );
                },
              },
            ],
    };

    const subMenuIPFS: DarwinMenuItemConstructorOptions = {
      label: 'IPFS',
      submenu: [
        {
          label: 'Ping',
          click: () => {
            pingIPFS()
              .then((res) => {
                return dialog.showMessageBox(this.mainWindow, {
                  message: `IPFS Ping Result: ${res ? 'Success' : 'Fail'}`,
                  type: 'info',
                  title: 'IPFS Ping',
                });
              })
              .catch((err) => {
                return dialog.showErrorBox(
                  'IPFS Add Error',
                  `Confirm that the IPFS daemon is running.\n${err}`
                );
              });
          },
        },
        {
          label: 'Add',
          click: () => {
            dialog
              .showOpenDialog(this.mainWindow, {
                properties: ['openFile'],
              })
              .then((choice) => {
                return choice.canceled
                  ? Promise.reject()
                  : addIPFS(choice.filePaths[0]);
              })
              .then((res) => {
                return dialog.showMessageBox(this.mainWindow, {
                  message: `IPFS added file with CID ${res}`,
                  type: 'info',
                  title: 'IPFS Add',
                });
              })
              .catch((err) => {
                return dialog.showErrorBox(
                  'IPFS Add Error',
                  `Confirm that the IPFS daemon is running.\n${err}`
                );
              });
          },
        },
        {
          label: 'Get',
          click: () => {
            dialog
              .showOpenDialog(this.mainWindow, {
                properties: ['openDirectory'],
              })
              .then((choice) => {
                return choice.canceled
                  ? Promise.reject()
                  : getIPFS(
                      'QmUaoioqU7bxezBQZkUcgcSyokatMY71sxsALxQmRRrHrj',
                      choice.filePaths[0]
                    );
              })
              .then((res) => {
                return dialog.showMessageBox(this.mainWindow, {
                  message: `Downloaded content from IFPS. Saved as: ${res}`,
                  type: 'info',
                  title: 'IPFS Get',
                });
              })
              .catch((err) => {
                return dialog.showErrorBox(
                  'IPFS Get Error',
                  `Confirm that the IPFS daemon is running.\n${err}`
                );
              });
          },
        },
      ],
    };

    const subMenuHelp: DarwinMenuItemConstructorOptions = {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('https://electronjs.org');
          },
        },
        {
          label: 'Documentation',
          click() {
            shell.openExternal(
              'https://github.com/electron/electron/tree/main/docs#readme'
            );
          },
        },
        {
          label: 'Community Discussions',
          click() {
            shell.openExternal('https://www.electronjs.org/community');
          },
        },
        {
          label: 'Search Issues',
          click() {
            shell.openExternal('https://github.com/electron/electron/issues');
          },
        },
      ],
    };

    return [
      // subMenuElectron,
      // subMenuElectron2,
      subMenuAbout,
      subMenuView,
      subMenuIPFS,
      subMenuHelp,
    ];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Open',
            accelerator: 'Ctrl+O',
          },
          {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            },
          },
        ],
      },
      {
        label: '&View',
        submenu:
          process.env.NODE_ENV === 'development' ||
          process.env.DEBUG_PROD === 'true'
            ? [
                {
                  label: '&Reload',
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reload();
                  },
                },
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  },
                },
                {
                  label: 'Toggle &Developer Tools',
                  accelerator: 'Alt+Ctrl+I',
                  click: () => {
                    this.mainWindow.webContents.toggleDevTools();
                  },
                },
              ]
            : [
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  },
                },
              ],
      },
      {
        label: 'IPFS',
        submenu: [
          {
            label: 'Ping',
            click: () => {
              pingIPFS()
                .then((res) => {
                  return dialog.showMessageBox(this.mainWindow, {
                    message: `IPFS Ping Result: ${res ? 'Success' : 'Fail'}`,
                    type: 'info',
                    title: 'IPFS Ping',
                  });
                })
                .catch((err) => {
                  return dialog.showErrorBox(
                    'IPFS Add Error',
                    `Confirm that the IPFS daemon is running.\n${err}`
                  );
                });
            },
          },
          {
            label: 'Add',
            click: () => {
              dialog
                .showOpenDialog(this.mainWindow, {
                  properties: ['openFile'],
                })
                .then((choice) => {
                  return choice.canceled
                    ? Promise.reject()
                    : addIPFS(choice.filePaths[0]);
                })
                .then((res) => {
                  return dialog.showMessageBox(this.mainWindow, {
                    message: `IPFS added file with CID ${res}`,
                    type: 'info',
                    title: 'IPFS Add',
                  });
                })
                .catch((err) => {
                  return dialog.showErrorBox(
                    'IPFS Add Error',
                    `Confirm that the IPFS daemon is running.\n${err}`
                  );
                });
            },
          },
          {
            label: 'Get',
            click: () => {
              dialog
                .showOpenDialog(this.mainWindow, {
                  properties: ['openDirectory'],
                })
                .then((choice) => {
                  return choice.canceled
                    ? Promise.reject()
                    : getIPFS(
                        'QmUaoioqU7bxezBQZkUcgcSyokatMY71sxsALxQmRRrHrj',
                        choice.filePaths[0]
                      );
                })
                .then((res) => {
                  return dialog.showMessageBox(this.mainWindow, {
                    message: `Downloaded content from IFPS. Saved as: ${res}`,
                    type: 'info',
                    title: 'IPFS Get',
                  });
                })
                .catch((err) => {
                  return dialog.showErrorBox(
                    'IPFS Get Error',
                    `Confirm that the IPFS daemon is running.\n${err}`
                  );
                });
            },
          },
        ],
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Learn More',
            click() {
              shell.openExternal('https://electronjs.org');
            },
          },
          {
            label: 'Documentation',
            click() {
              shell.openExternal(
                'https://github.com/electron/electron/tree/main/docs#readme'
              );
            },
          },
          {
            label: 'Community Discussions',
            click() {
              shell.openExternal('https://www.electronjs.org/community');
            },
          },
          {
            label: 'Search Issues',
            click() {
              shell.openExternal('https://github.com/electron/electron/issues');
            },
          },
        ],
      },
    ];

    return templateDefault;
  }
}
