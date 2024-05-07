import { WixMediaImage } from './Image/WixMediaImage';

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
            <div className="relative h-48 md:h-56">
              <WixMediaImage
                media={roomImage}
                className="rounded-lg"
                disableZoom={true}
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col justify-between flex-grow gap-y-2">
              <div>
                <h2>{title}</h2>
                <div dangerouslySetInnerHTML={{ __html: description }} />
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
    // <div className="grid lg:grid-cols-[2fr_1fr] gap-x-16 gap-y-24">
    //   {rooms.map((room, index) => {
    //     if (!room) {
    //       return;
    //     }
    //     const { roomImage, title, description, roomFeatures } = room.data;
    //     return (
    //       <div
    //         className="grid grid-rows-2 gap-y-4 relative grid-cols-1"
    //         key={index}
    //       >
    //         <WixMediaImage
    //           media={roomImage}
    //           className="rounded-lg"
    //           disableZoom={true}
    //           height={300}
    //         />
    //         <div className="flex flex-col gap-y-4">
    //           <h2>{title}</h2>
    //           <div dangerouslySetInnerHTML={{ __html: description }} />
    //           <div className="flex flex-wrap gap-x-8 justify-start relative h5 text-grey-site">
    //             {roomFeatures.map((feature: string, index: number) => (
    //               <p key={index}>{feature.toUpperCase()}</p>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};
