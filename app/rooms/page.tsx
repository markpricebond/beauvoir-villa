import { MainContent } from '@app/components/Layout/MainContent';
import {
  ContentBlockDataType,
  GenericContentBlock,
} from '@app/components/GenericContentBlock';
import { RoomsCollection } from '@app/components/RoomsCollection';
import { getWixClient } from '@app/utils/wix-data';

export default async function Rooms() {
  const client = await getWixClient();

  const roomsPageDataPromise = client.items
    .queryDataItems({ dataCollectionId: 'pages' })
    .eq('slug', 'rooms')
    .find();

  const roomsPromise = client.items
    .queryDataItems({ dataCollectionId: 'rooms' })
    .find();

  const roomsPageBlocksPromise = client.items.queryReferencedDataItems({
    dataCollectionId: 'pages',
    referringItemFieldName: 'multireference',
    referringItemId: '74412646-df77-45a3-8199-bef460276bb1',
  });

  const roomsPageFactsPromise = client.items.queryReferencedDataItems({
    dataCollectionId: 'pages',
    referringItemFieldName: 'facts',
    referringItemId: '74412646-df77-45a3-8199-bef460276bb1',
  });

  const [roomsPageData, roomsData] = await Promise.all([
    roomsPageDataPromise,
    roomsPromise,
  ]).then((promiseResults) =>
    promiseResults.map((promiseResult) => promiseResult.items)
  );

  const [roomPageBlocks, roomPageFacts] = await Promise.all([
    roomsPageBlocksPromise,
    roomsPageFactsPromise,
  ]).then((promiseResults) =>
    promiseResults.map((promiseResult) => promiseResult.results)
  );

  if (!roomsPageData) {
    return null;
  }
  return (
    <div className="relative">
      <MainContent pageData={roomsPageData} pageFacts={roomPageFacts}>
        {roomPageBlocks.map((block, index) => {
          if (block.dataItem) {
            return (
              <GenericContentBlock
                key={index}
                block={block.dataItem?.data as ContentBlockDataType}
              />
            );
          }
        })}
        <RoomsCollection rooms={roomsData} />
      </MainContent>
    </div>
  );
}
