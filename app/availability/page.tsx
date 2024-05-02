import { getPageData, getWixClient } from '@app/hooks/useWixClientServer';
import CalendarView from '@app/components/CalendarView';
import MainContent from '@app/components/Layout/MainContent';

export default async function Availability() {
  const wixClient = await getWixClient();
  const bookingsData = await wixClient.items
    .queryDataItems({
      dataCollectionId: 'bookings',
    })
    .find();

  const pageData = await getPageData('availability');

  if (!pageData) {
    return null;
  }
  return (
    <MainContent pageData={pageData}>
      <div className="mx-auto w-fit">
        <CalendarView items={bookingsData.items} />
      </div>
    </MainContent>
  );
}
