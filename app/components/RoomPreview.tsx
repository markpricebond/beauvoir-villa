'use client';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { WixMediaImage } from './Image/WixMediaImage';
import Link from 'next/link';

export const RoomPreview = ({
  rooms,
}: {
  rooms: (Record<string, any> | null | undefined)[];
}) => {
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
    <div className="px-8 relative">
      <h2 className="md:mx-8">Take a look inside</h2>
      <Carousel responsive={responsive} itemClass="mx-4 my-12 md:mx-12">
        {roomData.map((room, index) => (
          <Link href="/rooms" key={index}>
            <WixMediaImage media={room.roomImage} />
          </Link>
        ))}
      </Carousel>
    </div>
  );
};
