import MDEditor from '@uiw/react-md-editor';
import FileProps from 'renderer/common/FileProps';

export default function MarkdownReader({ data, filePath }: FileProps) {
  return (
    <div className="md_container">
      <h1>{filePath}</h1>
      <MDEditor.Markdown source={data} />
    </div>
  );
}
