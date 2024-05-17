import CalendarView from './CalendarView';
import {
  ContentBlockDataType,
  GenericContentBlock,
} from './GenericContentBlock';

export const BlocksCollection = ({
  blocks,
  bookings,
}: {
  blocks: any;
  bookings?: any;
}) => {
  return (
    <div className="flex flex-col md:flex-row md:gap-x-8">
      <div>
        {blocks.map((block: any, index: number) => {
          if (block.dataItem) {
            return (
              <GenericContentBlock
                key={index}
                block={block.dataItem?.data as ContentBlockDataType}
              />
            );
          }
        })}
      </div>
      {bookings && (
        <CalendarView
          items={bookings}
          className="md:w-1/4 h-min relative md:sticky md:top-40 md:mt-20 z-40 md:float-right"
        />
      )}
    </div>
  );
};
