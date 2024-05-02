import { CarouselClient } from '@app/components/Carousel/Carousel';
import { WixMediaImage } from '@app/components/Image/WixMediaImage';
import { getPageData, getWixClient } from './hooks/useWixClientServer';
import RichContentViewer from './elements/RichContentViewer';
import FactsGrid from './components/FactsGrid';

export default async function Home() {
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
  console.log(pageData);
  return (
    <div className="relative">
      <div className="relative grid grid-rows-6">
        {/* <div className="absolute top-0 left-0 h-[200px] sm:h-[calc(100%-55px)] w-full bg-black opacity-50"></div> */}
        <div className="relative row-start-1 row-span-4 col-start-1">
          <WixMediaImage
            media={pageData.mainImage}
            alt="Picture of the author"
          />
        </div>
        <div className="bg-gradient-to-t from-black from-50% col-start-1 row-start-3 row-span-3 z-10"></div>
        <div className="row-start-4 row-span-3 z-10 col-start-1 px-16 flex flex-col gap-y-8">
          <h5>{pageData.preHeading.toUpperCase()}</h5>
          <h1>{pageData.title}</h1>
          <div
            className="mt-8"
            dangerouslySetInnerHTML={{ __html: pageData.description }}
          />
        </div>
      </div>
      {/* <FactsGrid facts={pageData.facts} /> */}
      <CarouselClient items={reviewsItemsData.items} />
    </div>
  );
}
