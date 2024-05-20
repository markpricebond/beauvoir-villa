import {
  ReviewCollectionType,
  Testimonials,
} from '@app/components/Testimonials';
import { MainContent } from './components/Layout/MainContent';
import { ContentBlockDataType } from './components/GenericContentBlock';
import { RoomCollectionType, RoomPreview } from './components/RoomPreview';
import { notFound } from 'next/navigation';
import { getWixClient } from './utils/wix-data';
import { BlocksCollection } from './components/BlocksCollection';
import { MapView } from './components/MapView';
import { StreetView } from './components/StreetView';

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

  const homePageBottomBlocksPromise = client.items.queryReferencedDataItems({
    dataCollectionId: 'pages',
    referringItemFieldName: 'bottomContentBlocks',
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

  const [homePageBlocks, homePageBottomBlocks, homePageFacts] =
    await Promise.all([
      homePageBlocksPromise,
      homePageBottomBlocksPromise,
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
        <BlocksCollection
          blocks={homePageBlocks as (ContentBlockDataType | null)[]}
          bookings={bookings}
        />
      </MainContent>
      <RoomPreview rooms={rooms as RoomCollectionType} />
      {reviews && (
        <Testimonials
          reviews={reviews as ReviewCollectionType}
          background={backgroundImageRotation()}
        />
      )}
      <div className="rounded-lg py-24 px-8 md:px-16 justify-center flex flex-col md:flex-row gap-x-12 gap-y-4 items-center">
        <p className="md:basis-1/3">
          {`The Charente-Maritime is Poitou-Charentes' coastal department. Here,
          420 km of sandy beaches are lapped by the Atlantic under some of the
          sunniest skies in the whole of France. There are also three islands,
          each with its own unique atmosphere. Inland, you won't struggle to
          find some incredible cultural and historical gems. Romanesque
          architecture features heavily throughout the department.`}
        </p>
        <MapView className="max-w-screen-sm rounded-lg w-full md:basis-1/2 flex-grow" />
      </div>
      <div className="mx-8 md:mx-16 rounded-lg">
        <StreetView />
      </div>
      <div className="px-8 md:px-16">
        <BlocksCollection
          blocks={homePageBottomBlocks as (ContentBlockDataType | null)[]}
        />
      </div>
    </div>
  );
}
