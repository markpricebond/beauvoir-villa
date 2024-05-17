import CalendarView from '@app/components/CalendarView';
import {
  ContentBlockDataType,
  GenericContentBlock,
} from '@app/components/GenericContentBlock';
import { MainContent } from '@app/components/Layout/MainContent';
import { getWixClient } from '@app/utils/wix-data';

export default async function Availability() {
  const client = await getWixClient();

  const availabilityPageDataPromise = client.items
    .queryDataItems({ dataCollectionId: 'pages' })
    .eq('slug', 'availability')
    .find();

  const bookingsPromise = client.items
    .queryDataItems({ dataCollectionId: 'bookings' })
    .find();

  const availabilityPageBlocksPromise = client.items.queryReferencedDataItems({
    dataCollectionId: 'pages',
    referringItemFieldName: 'multireference',
    referringItemId: '5890c700-1d63-475f-b07e-f5640d3e789b',
  });

  const [pageData, bookingsData] = await Promise.all([
    availabilityPageDataPromise,
    bookingsPromise,
  ]).then((promiseResults) =>
    promiseResults.map((promiseResult) => promiseResult.items)
  );

  const availabilityPageBlocks = await availabilityPageBlocksPromise.then(
    (promiseResult) => promiseResult.results
  );

  if (!pageData) {
    return null;
  }
  return (
    <MainContent pageData={pageData}>
      {availabilityPageBlocks.map((block, index) => {
        if (block.dataItem) {
          return (
            <GenericContentBlock
              key={index}
              block={block.dataItem?.data as ContentBlockDataType}
            />
          );
        }
      })}

      <div className="md:flex md:justify-center">
        <CalendarView items={bookingsData} />
      </div>
    </MainContent>
  );
}
