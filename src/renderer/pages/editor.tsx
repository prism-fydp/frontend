// import React, { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import FileProps from 'renderer/common/FileProps';

export default function MarkdownEditor(
  { data, filePath }: FileProps,
  set: (value: FileProps) => void
) {
  const setData = (v: string | undefined) => {
    const cleanValue = v === undefined ? '' : v;
    set({ data: cleanValue, filePath });
  };

  return (
    <div className="md_editor">
      <MDEditor value={data} onChange={setData} title={filePath} />
    </div>
  );
}
