'use client';

import { RicosViewer } from 'ricos-viewer';
import { toDraft } from 'ricos-content/libs/toDraft';

const RichContentViewer = ({ content }: { content: any }) => {
  console.log(content);
  return <RicosViewer content={toDraft(content)} />;
};
export default RichContentViewer;
