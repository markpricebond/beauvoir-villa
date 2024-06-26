/* eslint-disable jsx-a11y/alt-text */
import {
  convertToNextImageProps,
  getImageProps,
} from '@app/utils/wix-media-image';
import Image from 'next/image';
export const RoomsCollection = ({
  rooms,
}: {
  rooms: (Record<string, any> | null | undefined)[];
}) => {
  if (!rooms) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {rooms.map((room, index) => {
        if (!room) {
          return null;
        }
        const { roomImage, title, description, roomFeatures, footnote } =
          room.data;

        return (
          <div className="flex flex-col gap-y-8" key={index}>
            <div className="relative">
              <Image
                {...convertToNextImageProps(getImageProps(roomImage))}
                className="rounded-lg w-full"
                style={{ objectFit: 'cover', aspectRatio: 16 / 9 }}
              />
            </div>
            <div className="flex flex-col justify-between flex-grow gap-y-8">
              <div>
                <h2>{title}</h2>
                <div
                  className="mt-2"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
              <div className="flex flex-wrap gap-x-8 justify-start h5 text-grey-site">
                {roomFeatures.map((feature: string, index: number) => (
                  <div className="flex gap-x-2" key={index}>
                    <p>-</p>
                    <p>{feature.toUpperCase()}</p>
                  </div>
                ))}
                {footnote && <p className="p2">{footnote}</p>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
