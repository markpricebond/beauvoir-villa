/* eslint-disable jsx-a11y/alt-text */
import {
  getImageProps,
  convertToNextImageProps,
} from '@app/utils/wix-media-image';
import Image from 'next/image';

export const Testimonials = ({
  items,
  background,
}: {
  items: (Record<string, any> | null | undefined)[];
  background?: any;
}) => {
  return (
    <div className="flex flex-col gap-y-2 relative py-12">
      {background && (
        <div className="absolute top-0 bottom-0 w-full opacity-50">
          <Image
            {...convertToNextImageProps(getImageProps(background.src))}
            style={{ objectFit: 'cover' }}
            className="h-full"
            sizes="100vw"
          />
        </div>
      )}

      <h5 className="mx-8 z-10">TESTIMONIALS</h5>
      <div className="grid lg:grid-cols-3 justify-center mx-4">
        {items.map((item, i) => {
          if (!item) {
            return null;
          }
          return (
            <div
              key={i}
              className="z-10 md:basis-1/3 md:h-64 flex flex-col gap-y-4 justify-end bg-black text-white p-4 m-4 border border-white rounded-lg"
            >
              <div className="flex-grow flex items-center">
                <p>{`“${item.data.reviewText}”`}</p>
              </div>
              <div className="flex items-center gap-x-4 relative">
                <div className="md:relative h-12 w-12 absolute max-md:-right-6 max-md:-bottom-6 max-md:rotate-12">
                  <Image
                    {...convertToNextImageProps(
                      getImageProps(item.data.reviewImage)
                    )}
                    style={{ objectFit: 'cover' }}
                    className="rounded-full h-full"
                  />
                </div>
                <p className="p2">{item.data.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
