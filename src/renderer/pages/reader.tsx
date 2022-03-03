import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import FileInfo from '../file_management/file_info';
import FileManager from '../file_management/file_manager';
import Paths from './paths';

/*
 * A markdown editor. Markdown text to render is provided in the props.
 */
export default function MarkdownReader() {
  const [fileInfo, setFileInfo] = useState<FileInfo>({
    data: '',
    filePath: '',
  });

  const fileInfoRef = useRef(fileInfo);

  useEffect(() => {
    FileManager.new(Paths.READER, { info: fileInfoRef, update: setFileInfo });
  }, []);

  return (
    <div className="md_container">
      <MDEditor.Markdown source={fileInfo.data} />
    </div>
  );
}
