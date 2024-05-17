/* eslint-disable jsx-a11y/alt-text */
'use client';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Link from 'next/link';
import Image from 'next/image';
import {
  convertToNextImageProps,
  getImageProps,
} from '@app/utils/wix-media-image';

export type RoomCollectionType = {
  dataCollectionId?: string;
  data?: {
    roomImage: string;
    roomFeatures?: string[];
    description?: string;
    _id: string;
    floor?: string;
    title: string;
  } | null;
  _id: string;
}[];

export const RoomPreview = ({ rooms }: { rooms: RoomCollectionType }) => {
  const roomData = rooms.map((room) => {
    if (!room) {
      return null;
    }
    return room.data;
  });

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="px-8 md:px-16">
      <h2 className="md:mx-8">Take a look inside</h2>

      <div className="relative">
        <div className="absolute w-8 bg-gradient-to-r from-black -left-[2px] h-full z-40"></div>
        <div className="absolute w-8 bg-gradient-to-l from-black -right-[2px] h-full z-40"></div>
        <Carousel
          responsive={responsive}
          itemClass="mx-2 md:mx-4 my-12 md:mx-12"
        >
          {roomData.map((room, index) => {
            if (!room) return null;
            return (
              <Link href="/rooms" key={index} className="relative h-full">
                <Image
                  {...convertToNextImageProps(getImageProps(room.roomImage))}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="h-full rounded-md hover:opacity-40"
                />
                <div className="absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center hover:opacity-100 opacity-0 bg-black bg-opacity-50">
                  <h6>{room.title}</h6>
                </div>
              </Link>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};
