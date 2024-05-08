import { PropsWithChildren } from 'react';
import { WixMediaImage } from '../Image/WixMediaImage';
import FactsGrid from '../FactsGrid';

export const MainContent = ({
  children,
  pageData,
  pageFacts,
}: PropsWithChildren & {
  pageData: Record<string, any> | null;
  pageFacts?: (Record<string, any> | null | undefined)[];
}) => {
  if (!pageData) {
    return null;
  }
  const { mainImage, preHeading, title, description } = pageData;
  return (
    <>
      <div className="grid">
        <div className="relative row-start-1 row-span-2 col-start-1 max-h-[60vh]">
          <WixMediaImage media={mainImage} alt={title} />
        </div>
        <div className="row-start-2 row-span-2 bg-gradient-to-t from-black w-full z-10 col-start-1" />
        <div className="px-8 md:px-16 row-start-4 row-span-2 col-start-1">
          <h5>{preHeading.toUpperCase()}</h5>
          <h1>{title}</h1>
          {pageFacts && <FactsGrid facts={pageFacts} />}
          {description && (
            <div
              className="mt-8"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
      </div>

      <div className="md:p-16 p-8">{children}</div>
    </>
  );
};
