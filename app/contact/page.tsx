import { ContactForm } from '@app/components/ContactForm';
import MainContent from '@app/components/Layout/MainContent';
import { getPageData } from '@app/hooks/useWixClientServer';
export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: Date | undefined };
}) {
  const pageData = await getPageData('contact');
  if (!pageData) {
    return null;
  }
  return (
    <MainContent pageData={pageData}>
      <div className="max-w-4xl mx-auto my-20">
        <ContactForm preFilledDate={searchParams.startDate} />
      </div>
    </MainContent>
  );
}
