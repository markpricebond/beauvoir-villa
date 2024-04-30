import { getWixClient } from '@app/hooks/useWixClientServer';
import CalendarView from '@app/components/CalendarView';

export default async function Availability() {
  const wixClient = await getWixClient();
  const { items } = await wixClient.items
    .queryDataItems({
      dataCollectionId: 'bookings',
    })
    .find();

  return (
    <div className="relative">
      <div className="w-full flex flex-col items-center gap-12">
        <CalendarView items={items} />
      </div>
    </div>
  );
}
