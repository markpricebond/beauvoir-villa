import { ContactForm } from '@app/components/ContactForm';
import {
  ContentBlockDataType,
  GenericContentBlock,
} from '@app/components/GenericContentBlock';
import { MainContent } from '@app/components/Layout/MainContent';
import { getWixClient } from '@app/utils/wix-data';
export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: Date | undefined };
}) {
  const client = await getWixClient();

  const contactPageDataPromise = client.items
    .queryDataItems({ dataCollectionId: 'pages' })
    .eq('slug', 'contact')
    .find();

  const contactPageBlocksPromise = client.items.queryReferencedDataItems({
    dataCollectionId: 'pages',
    referringItemFieldName: 'multireference',
    referringItemId: '0357ebf6-0c3d-408d-b81e-ff43ed0e503c',
  });

  const contactPageFactsPromise = client.items.queryReferencedDataItems({
    dataCollectionId: 'pages',
    referringItemFieldName: 'facts',
    referringItemId: '0357ebf6-0c3d-408d-b81e-ff43ed0e503c',
  });

  const pageData = await contactPageDataPromise.then(
    (promiseResult) => promiseResult.items
  );

  const [contactPageBlocks, contactPageFacts] = await Promise.all([
    contactPageBlocksPromise,
    contactPageFactsPromise,
  ]).then((promiseResults) =>
    promiseResults.map((promiseResult) => promiseResult.results)
  );

  if (!pageData) {
    return null;
  }
  return (
    <MainContent pageData={pageData} pageFacts={contactPageFacts}>
      {contactPageBlocks.map((block, index) => {
        if (block.dataItem) {
          return (
            <GenericContentBlock
              key={index}
              block={block.dataItem?.data as ContentBlockDataType}
            />
          );
        }
      })}
      <div className="max-w-4xl mx-auto my-20">
        <ContactForm preFilledDate={searchParams.startDate} />
      </div>
    </MainContent>
  );
}
