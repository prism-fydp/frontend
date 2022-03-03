// Jest does not initialize any of the main - renderer IPC functions. This
// causes problems when we attempt to run any testcases because part of setting
// up the UI for the first time is creating listeners on IPC channels.
//
// To get around this, we need to mock the functions. This cannot be done in a
// 'typical' mock file however, since what we are trying to mock is a member of
// the global namespace. This file is how that is achieved.
global.window.electron = {
  ipcRenderer: {
    myPing: jest.fn(),
    on: jest.fn(),
    once: jest.fn(),
    send: jest.fn(),
  },
};
