import MDEditor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';
import NavOverlay from '../components/nav_overlay';
import FileInfo from '../file_management/file_info';
import FileManager from '../file_management/file_manager';
import Paths from './paths';

/*
 * A markdown editor. Markdown text state is maintained within the props.
 */
export default function MarkdownEditor() {
  const [fileInfo, setFileData] = useState<FileInfo>({
    data: '',
    filePath: '',
  });

  const fileInfoRef = useRef(fileInfo);

  useEffect(() => {
    fileInfoRef.current = fileInfo;
  }, [fileInfo]);

  useEffect(() => {
    FileManager.new(Paths.EDITOR, { info: fileInfoRef, update: setFileData });
  }, []);

  // Sanitized setter since the MDEditor onChange prop can use undefined
  const setData = (v: string | undefined) => {
    const cleanValue = v === undefined ? '' : v;
    setFileData({ ...fileInfo, data: cleanValue });
  };

  return (
    <NavOverlay backButton>
      <MDEditor
        value={fileInfo.data}
        onChange={setData}
        height={window.innerHeight * 0.9}
      />
    </NavOverlay>
  );
}
