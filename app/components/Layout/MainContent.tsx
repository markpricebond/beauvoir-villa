import { PropsWithChildren } from 'react';
import { WixMediaImage } from '../Image/WixMediaImage';

const MainContent = ({
  children,
  pageData,
}: PropsWithChildren & { pageData: Record<string, any> | null }) => {
  if (!pageData) {
    return null;
  }
  const { mainImage, preHeading, title, description } = pageData;
  return (
    <div className="relative">
      <div className="relative grid grid-rows-5">
        <div className="relative row-start-1 row-span-5 col-start-1">
          <WixMediaImage media={mainImage} alt={title} />
        </div>
        <div className="bg-gradient-to-t from-black from-50% col-start-1 row-start-3 row-span-3 z-10"></div>
        <div className="row-start-4 row-span-2 z-10 col-start-1 px-16 flex flex-col gap-y-6 self-center">
          <h5>{preHeading.toUpperCase()}</h5>
          <h1>{title}</h1>
          {description && (
            <div
              className="mt-8"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
      </div>
      <div className="px-16">{children}</div>
    </div>
  );
};

export default MainContent;
