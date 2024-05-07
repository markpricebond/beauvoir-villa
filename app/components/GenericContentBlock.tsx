import { WixMediaImage } from './Image/WixMediaImage';

export type ContentBlockDataType = {
  preHeader?: string;
  title: string;
  copy?: string;
  image?: string;
  pageAnchorId?: string;
};
export const GenericContentBlock = ({
  block,
}: {
  block?: ContentBlockDataType | null;
}) => {
  if (!block) {
    return null;
  }
  const { preHeader, title, copy, image, pageAnchorId } = block;
  return (
    <div
      id={pageAnchorId ?? title.toLowerCase().replace(' ', '-')}
      className="py-20 flex flex-col gap-y-8"
    >
      {preHeader && <h4>{preHeader.toUpperCase()}</h4>}
      <h2>{title}</h2>

      {image && (
        <WixMediaImage media={image} className="rounded-lg max-w-screen-md" />
      )}
      {copy && (
        <div className="mt-8" dangerouslySetInnerHTML={{ __html: copy }} />
      )}
    </div>
  );
};
