import { CMSCollection } from '@app/hooks/useWixClientServer';
import { WixImageType, WixMediaImage } from './Image/WixMediaImage';

interface ReviewItem {
  name: string;
  reviewText: string;
  mainImage?: any;
}

export const Testimonials = ({
  items,
  background,
}: {
  items: (Record<string, any> | null | undefined)[];
  background?: WixImageType;
}) => {
  return (
    <div className="flex flex-col gap-y-2 relative py-12">
      {background && (
        <div className="absolute top-0 bottom-0 w-full opacity-50">
          <WixMediaImage
            media={background.src}
            sizes="100vw"
            objectFit="cover"
            disableZoom={true}
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
              className="z-10 md:basis-1/3 md:h-64 flex flex-col gap-y-4 justify-between bg-black text-white p-4 m-4 border border-white rounded-lg"
            >
              <p>{`“${item.data.reviewText}”`}</p>
              <div className="flex items-center gap-x-4 relative">
                <div className="md:relative h-12 w-12 absolute max-md:-right-6 max-md:-bottom-6 max-md:rotate-12">
                  <WixMediaImage
                    media={item.data.mainImage}
                    alt="Picture of person reviewing Beauvoir Villa"
                    className="rounded-full"
                    disableZoom={true}
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
