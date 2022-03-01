// Module outlining the window API available for all renderer processes. To add
// additional calls, there must be API exposure provided in src/main/preload.js

// Establishes this file as a module
export {};

// Extend the Window interface used in the renderer, exposing the API for the
// renderer thread(s) to interact with the main thread.
declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        myPing: () => void;

        // Following functions use arguments of type `unknown` instead of `any`
        // because typescript gets mad when using an explicit `any` type here.
        // This still functions the same, requiring that provided funcs check
        // the type of their argument
        on: (channel: string, func: (...arg: unknown[]) => void) => void;
        once: (channel: string, func: (...arg: unknown[]) => void) => void;
      };
    };
  }
}
