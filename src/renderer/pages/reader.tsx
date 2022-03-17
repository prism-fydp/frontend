import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import PaymentButton from 'renderer/components/PaymentButton';
import { useCurrentWriter } from 'renderer/hooks/user';
import FileInfo from '../file_management/file_info';
import FileManager from '../file_management/file_manager';
import Paths from './paths';
import NavOverlay from '../components/nav_overlay';

/*
 * A markdown editor. Markdown text to render is provided in the props.
 */
export default function MarkdownReader() {
  const currentWriter = useCurrentWriter();
  const [fileInfo, setFileInfo] = useState<FileInfo>({
    data: '',
    filePath: '',
  });

  const fileInfoRef = useRef(fileInfo);

  useEffect(() => {
    FileManager.new(Paths.READER, { info: fileInfoRef, update: setFileInfo });
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#F5F5F5',
        overflow: 'scroll',
      }}
    >
      <NavOverlay backButton>
        <PaymentButton address={currentWriter.publicAddress} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '70vw', color: 'black' }}>
            <MDEditor.Markdown source={fileInfo.data} />
          </div>
        </div>
      </NavOverlay>
    </div>
  );
}
