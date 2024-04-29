import { getWixClient } from '@app/hooks/useWixClientServer';
import { WixMediaImage } from '@app/components/Image/WixMediaImage';
import testIds from '@app/utils/test-ids';
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
