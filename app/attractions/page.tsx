import CalendarView from '@app/components/CalendarView';
import {
  ContentBlockDataType,
  GenericContentBlock,
} from '@app/components/GenericContentBlock';
import { MainContent } from '@app/components/Layout/MainContent';
import { getWixClient } from '@app/utils/wix-data';

export default async function Atractions() {
  const client = await getWixClient();

  const attractionsPageDataPromise = client.items
    .queryDataItems({ dataCollectionId: 'pages' })
    .eq('slug', 'attractions')
    .find();

  const attractionsPageBlocksPromise = client.items.queryReferencedDataItems({
    dataCollectionId: 'pages',
    referringItemFieldName: 'multireference',
    referringItemId: '6bb0e776-9c0a-46a1-826f-6c926bfcea5b',
  });

  const [pageData] = await Promise.all([attractionsPageDataPromise]).then(
    (promiseResults) =>
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
      {attractionsPageBlocks.map((block, index) => {
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
  );
}
