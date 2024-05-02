import { PropsWithChildren } from 'react';
import { WixMediaImage } from '../Image/WixMediaImage';

const MainContent = ({
  children,
  pageData,
}: PropsWithChildren & { pageData: Record<string, any> | null }) => {
  if (!pageData) {
    return null;
  }
  return (
    <div className="relative">
      <div className="relative grid grid-rows-5">
        <div className="relative row-start-1 row-span-4 col-start-1">
          <WixMediaImage
            media={pageData.mainImage}
            alt="Picture of the author"
          />
        </div>
        <div className="bg-gradient-to-t from-black from-50% col-start-1 row-start-3 row-span-3 z-10"></div>
        <div className="row-start-4 row-span-2 z-10 col-start-1 px-16">
          <p>{pageData.preHeading}</p>
          <h1>{pageData.title}</h1>
          {/* <RichContentViewer content={pageData.description} /> */}
          <h4 className="mt-12">{pageData.description}</h4>
        </div>
        <div className="px-16">{children}</div>
      </div>
    </div>
  );
};

export default MainContent;
