import { Testimonials } from '@app/components/Testimonials';
import {
  getCollectionOfItems,
  getPageCollection,
  getPageData,
  getWixClient,
} from './hooks/useWixClientServer';
import FactsGrid from './components/FactsGrid';
import { MainContent } from './components/Layout/MainContent';
import {
  ContentBlockDataType,
  GenericContentBlock,
} from './components/GenericContentBlock';
import { RoomPreview } from './components/RoomPreview';

export default async function Home() {
  let imageCounter = -1;

  const pageData = await getPageData('');
  const roomData = await getCollectionOfItems('rooms');
  const reviewData = await getCollectionOfItems('VillaReviews');

  if (!pageData) {
    return null;
  }
  const pageBlocks = await getPageCollection('multireference', pageData?._id);
  const pageFactsData = await getPageCollection('facts', pageData?._id);
  const pageFacts = pageFactsData.map((fact) => fact.dataItem?.data);

  const backgroundImageRotation = () => {
    let totalBgImages = pageData.genericBackgroundImages.length;
    if (imageCounter < totalBgImages) {
      imageCounter += 1;
    } else {
      imageCounter = 0;
    }

    return pageData.genericBackgroundImages[imageCounter];
  };

  return (
    <div className="relative">
      <MainContent pageData={pageData} pageFacts={pageFacts}>
        {pageBlocks.map((block, index) => {
          if (block.dataItem) {
            return (
              <GenericContentBlock
                key={index}
                block={block.dataItem?.data as ContentBlockDataType}
              />
            );
          }
        })}
      </MainContent>
      <RoomPreview rooms={roomData} />
      {reviewData && (
        <Testimonials
          items={reviewData}
          background={backgroundImageRotation()}
        />
      )}
    </div>
  );
}
