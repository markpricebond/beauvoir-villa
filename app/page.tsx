import { Testimonials } from '@app/components/Testimonials';
import { WixMediaImage } from '@app/components/Image/WixMediaImage';
import {
  getPageBlocks,
  getPageData,
  getWixClient,
} from './hooks/useWixClientServer';
import FactsGrid from './components/FactsGrid';
import MainContent from './components/Layout/MainContent';
import {
  ContentBlockDataType,
  GenericContentBlock,
} from './components/GenericContentBlock';

export default async function Home() {
  let imageCounter = -1;

  const wixClient = await getWixClient();

  const reviewsItemsData = await wixClient.items
    .queryDataItems({
      dataCollectionId: 'VillaReviews',
    })
    .find();

  const pageData = await getPageData('');

  const pageBlocks = await getPageBlocks(pageData?._id);

  if (!pageData) {
    return null;
  }

  const backgroundImageRotation = () => {
    imageCounter += 1;
    return pageData.genericBackgroundImages[imageCounter];
  };

  return (
    <div className="relative">
      {/* <FactsGrid facts={pageData.facts} /> */}
      <MainContent pageData={pageData}>
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
      <Testimonials
        items={reviewsItemsData.items}
        background={backgroundImageRotation()}
      />
    </div>
  );
}
