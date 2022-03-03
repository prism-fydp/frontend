export default interface FileInfo {
  data: string;
  filePath: string;
}

/*
 * Type guard to verify that an unknown value v can be interpreted as a
 * FileInfo instance. Required since data read from IPC is always unknown.
 */
export function isValidFileInfo(v: unknown): v is FileInfo {
  return (
    Object.prototype.hasOwnProperty.call(v, 'data') &&
    Object.prototype.hasOwnProperty.call(v, 'filePath')
  );
}
