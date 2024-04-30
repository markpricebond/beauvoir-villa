import { CarouselClient } from '@app/components/Carousel/Carousel';
import { WixMediaImage } from '@app/components/Image/WixMediaImage';
import { getWixClient } from './hooks/useWixClientServer';
import Image from 'next/image';

export default async function Home() {
  const wixClient = await getWixClient();
  const reviewsItemsData = await wixClient.items
    .queryDataItems({
      dataCollectionId: 'VillaReviews',
    })
    .find();

  const roomsItemsData = await wixClient.items
    .queryDataItems({
      dataCollectionId: 'rooms',
    })
    .find();

  const pageItemsData = await wixClient.items
    .queryDataItems({
      dataCollectionId: 'pages',
    })
    .eq('title', 'Home')
    .find();

  const pageData = pageItemsData.items.map((item) => item.data)[0];
  console.log(pageData);

  if (!pageData) {
    return null;
  }

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
        <div className="bg-gradient-to-t from-white from-50% col-start-1 row-start-3 row-span-3 z-10"></div>
        <div className="row-start-4 row-span-3 z-10 col-start-1 px-8">
          <h1>{pageData.title}</h1>
          <h4>{pageData.description}</h4>
        </div>
      </div>
      <CarouselClient items={reviewsItemsData.items} />
    </div>
  );
}
