import FileInfo from './file_info';

interface FileManagement {
  info: React.MutableRefObject<FileInfo>;
  update: (v: FileInfo) => void;
}

export default abstract class FileManager {
  private static m_map: Map<string, FileManagement> = new Map();

  static new(page: string, data: FileManagement) {
    this.m_map.set(page, data);
  }

  static get(page: string) {
    return this.m_map.get(page);
  }

  static set(page: string, newData: FileInfo) {
    const original = this.m_map.get(page);
    if (original) {
      original.update(newData);
    }
  }

  static updateText(page: string, newText: string) {
    const original = this.m_map.get(page);
    if (original) {
      original.update({ ...original.info.current, data: newText });
    }
  }
}
