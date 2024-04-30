'use client';
import { CMSCollection } from '@app/hooks/useWixClientServer';
import { Carousel } from 'flowbite-react';

export const CarouselClient = ({ items }: { items: CMSCollection }) => {
  console.log(items);

  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mt-20 sm:mt-40">
      <Carousel>
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-14 h-full items-center justify-center bg-blue-site text-white p-8"
          >
            <h3 className="text-lg sm:text-4xl max-w-xs sm:max-w-3xl font-site">
              {item.data?.reviewText}
            </h3>
            <p>{item.data?.name}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
