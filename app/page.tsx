import { Testimonials } from '@app/components/Testimonials';
import {
  getPageCollection,
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

  if (!pageData) {
    return null;
  }

  const pageBlocks = await getPageCollection('multireference', pageData?._id);
  const pageFacts = await (
    await getPageCollection('facts', pageData?._id)
  ).map((fact) => fact.dataItem?.data);

  console.log(pageFacts);

  const backgroundImageRotation = () => {
    imageCounter += 1;
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
      <Testimonials
        items={reviewsItemsData.items}
        background={backgroundImageRotation()}
      />
    </div>
  );
}
