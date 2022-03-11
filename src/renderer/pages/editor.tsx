import MDEditor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';
import NavOverlay from '../components/nav_overlay';
import FileInfo from '../file_management/file_info';
import FileManager from '../file_management/file_manager';
import Paths from './paths';
import '../components/try.css';

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
    <NavOverlay hideEditorButton>
      <MDEditor
        value={fileInfo.data}
        onChange={setData}
        height={window.innerHeight * 0.9}
      />
      <button
        className="text-3xl shadow-solid-primary
                    border-2 border-black py-6 px-4
                    transition-colors ease-out
                    duration-500 text-white
                    bg-gradient-to-r
                    from-gray-900 to-black
                    hover:from-white hover:to-gray-100
                    hover:text-black hover:border-black
                    "
        type="button"
        onClick={() => nav(routepath)}
      >
        {buttonText}
      </button>
      <Trybutton routepath={Paths.DELETE} buttonText="Delete your essay" />
    </NavOverlay>
  );
}
