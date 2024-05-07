import {
  getPageCollection,
  getPageData,
  getWixClient,
} from '@app/hooks/useWixClientServer';
import MainContent from '@app/components/Layout/MainContent';
import {
  ContentBlockDataType,
  GenericContentBlock,
} from '@app/components/GenericContentBlock';
import { RoomsCollection } from '@app/components/RoomsCollection';
export default async function Rooms() {
  const wixClient = await getWixClient();
  const { items } = await wixClient.items
    .queryDataItems({
      dataCollectionId: 'rooms',
    })
    .find();

  const pageData = await getPageData('rooms');

  if (!pageData) {
    return null;
  }

  const pageBlocks = await getPageCollection('multireference', pageData?._id);
  console.log(items);
  return (
    <div className="relative">
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
        <RoomsCollection rooms={items} />
      </MainContent>
    </div>
  );
}
