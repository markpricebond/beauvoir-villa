import {
  getCollectionOfItems,
  getPageCollection,
  getPageData,
  getWixClient,
} from '@app/hooks/useWixClientServer';
import { MainContent } from '@app/components/Layout/MainContent';
import {
  ContentBlockDataType,
  GenericContentBlock,
} from '@app/components/GenericContentBlock';
import { RoomsCollection } from '@app/components/RoomsCollection';

export default async function Rooms() {
  const rooms = await getCollectionOfItems('rooms');
  const pageData = await getPageData('rooms');

  if (!pageData || !rooms) {
    return null;
  }

  const pageBlocks = await getPageCollection('multireference', pageData?._id);
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
        <RoomsCollection rooms={rooms.items} />
      </MainContent>
    </div>
  );
}
