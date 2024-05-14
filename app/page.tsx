import {
  ReviewCollectionType,
  Testimonials,
} from '@app/components/Testimonials';
import { MainContent } from './components/Layout/MainContent';
import {
  ContentBlockDataType,
  GenericContentBlock,
} from './components/GenericContentBlock';
import { RoomCollectionType, RoomPreview } from './components/RoomPreview';
import { notFound } from 'next/navigation';
import { getWixClient } from './utils/wix-data';

export default async function Home() {
  let imageCounter = -1;
  const client = await getWixClient();

  const bookingsPromise = client.items
    .queryDataItems({ dataCollectionId: 'bookings' })
    .find();
  const roomsPromise = client.items
    .queryDataItems({ dataCollectionId: 'rooms' })
    .find();
  const reviewsPromise = client.items
    .queryDataItems({ dataCollectionId: 'VillaReviews' })
    .find();
  const roomsPageDataPromise = client.items
    .queryDataItems({ dataCollectionId: 'pages' })
    .eq('slug', 'rooms')
    .find();
  const availabilityPageDataPromise = client.items
    .queryDataItems({ dataCollectionId: 'pages' })
    .eq('slug', 'availability')
    .find();
  const contactPageDataPromise = client.items
    .queryDataItems({ dataCollectionId: 'pages' })
    .eq('slug', 'contact')
    .find();
  const homePageDataPromise = client.items
    .queryDataItems({ dataCollectionId: 'pages' })
    .eq('slug', null)
    .find();

  const homePageBlocksPromise = client.items.queryReferencedDataItems({
    dataCollectionId: 'pages',
    referringItemFieldName: 'multireference',
    referringItemId: 'd2a8fd59-1f0c-432c-82b0-8bb8af7a3972',
  });

  const homePageFactsPromise = client.items.queryReferencedDataItems({
    dataCollectionId: 'pages',
    referringItemFieldName: 'facts',
    referringItemId: 'd2a8fd59-1f0c-432c-82b0-8bb8af7a3972',
  });

  const [
    bookings,
    rooms,
    reviews,
    roomsPageData,
    availabilityPageData,
    contactPageData,
    homePageData,
  ] = await Promise.all([
    bookingsPromise,
    roomsPromise,
    reviewsPromise,
    roomsPageDataPromise,
    availabilityPageDataPromise,
    contactPageDataPromise,
    homePageDataPromise,
  ]).then((promiseResults) =>
    promiseResults.map((promiseResult) => promiseResult.items)
  );

  const [homePageBlocks, homePageFacts] = await Promise.all([
    homePageBlocksPromise,
    homePageFactsPromise,
  ]).then((promiseResults) =>
    promiseResults.map((promiseResult) => promiseResult.results)
  );

  const backgroundImageRotation = () => {
    const homePageBackgrounds = homePageData[0].data?.genericBackgroundImages;
    let totalBgImages = homePageBackgrounds.length;
    if (imageCounter < totalBgImages) {
      imageCounter += 1;
    } else {
      imageCounter = 0;
    }

    return homePageBackgrounds[imageCounter];
  };

  if (!homePageData) {
    return notFound();
  }

  return (
    <div className="relative">
      <MainContent pageData={homePageData} pageFacts={homePageFacts}>
        {homePageBlocks.map((block, index) => {
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
      <RoomPreview rooms={rooms as RoomCollectionType} />
      {reviews && (
        <Testimonials
          reviews={reviews as ReviewCollectionType}
          background={backgroundImageRotation()}
        />
      )}
    </div>
  );
}
