import MDEditor from '@uiw/react-md-editor';

export default function MarkdownReader() {
  return (
    <div className="md_container">
      <MDEditor.Markdown source="a" />
    </div>
  );
}
