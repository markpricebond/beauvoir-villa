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
    <div className="grid grid-cols-2 gap-16">
      {rooms.map((room, index) => {
        if (!room) {
          return;
        }
        return (
          <div className="flex flex-col gap-y-4" key={index}>
            <WixMediaImage
              media={room.data.roomImage}
              className="rounded-lg max-w-screen-md"
            />

            <h2>{room.data.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: room.data.description }} />
          </div>
        );
      })}
    </div>
  );
};
