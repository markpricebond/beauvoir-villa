import { PropsWithChildren } from 'react';
import { WixMediaImage } from '../Image/WixMediaImage';
import FactsGrid from '../FactsGrid';

const MainContent = ({
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
    <div className="relative">
      <div className="relative grid grid-rows-5">
        <div className="relative row-start-1 row-span-2 md:row-span-5 col-start-1">
          <WixMediaImage media={mainImage} alt={title} />
        </div>
        <div className="bg-gradient-to-t from-black from-95% md:from-50% col-start-1 row-start-2 row-span-4 md:row-start-3 md:row-span-3 z-10"></div>
        <div className="md:row-start-4 row-span-4 row-start-2 md:row-span-2 z-10 col-start-1 px-8 mt-8 md:mt-unset after:flex flex-col gap-y-2 md:gap-y-6 self-center">
          {preHeading && <h5>{preHeading.toUpperCase()}</h5>}
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
    </div>
  );
};

export default MainContent;
