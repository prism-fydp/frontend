import React from 'react';
import MDEditor from '@uiw/react-md-editor';

export default function MarkdownEditor() {
  const [value, setValue] = React.useState(`**Hello world!!!**`);

  const set = (v: string | undefined) => {
    const cleanValue = v === undefined ? '' : v;
    setValue(cleanValue);
  };

  return (
    <div className="md_container">
      <MDEditor value={value} onChange={set} />
      {/* <MDEditor.Markdown source={value} /> */}
    </div>
  );
}
