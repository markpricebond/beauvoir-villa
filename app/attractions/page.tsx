import { BlocksCollection } from '@app/components/BlocksCollection';
import { MainContent } from '@app/components/Layout/MainContent';
import { getWixClient } from '@app/utils/wix-data';

export default async function Atractions() {
  const client = await getWixClient();

  const bookingsPromise = client.items
    .queryDataItems({ dataCollectionId: 'bookings' })
    .find();
  const attractionsPageDataPromise = client.items
    .queryDataItems({ dataCollectionId: 'pages' })
    .eq('slug', 'attractions')
    .find();

  const attractionsPageBlocksPromise = client.items.queryReferencedDataItems({
    dataCollectionId: 'pages',
    referringItemFieldName: 'multireference',
    referringItemId: '6bb0e776-9c0a-46a1-826f-6c926bfcea5b',
  });

  const [pageData, bookings] = await Promise.all([
    attractionsPageDataPromise,
    bookingsPromise,
  ]).then((promiseResults) =>
    promiseResults.map((promiseResult) => promiseResult.items)
  );

  const attractionsPageBlocks = await attractionsPageBlocksPromise.then(
    (promiseResult) => promiseResult.results
  );

  if (!pageData) {
    return null;
  }
  return (
    <MainContent pageData={pageData}>
      <BlocksCollection blocks={attractionsPageBlocks} bookings={bookings} />
    </MainContent>
  );
}
