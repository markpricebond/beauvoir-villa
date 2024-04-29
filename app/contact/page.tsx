import { WixMediaImage } from '@app/components/Image/WixMediaImage';
export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: Date | undefined };
}) {
  return (
    <div className="relative">
      <div className="w-full h-[400px] relative">
        <WixMediaImage
          media="https://static.wixstatic.com/media/0b340f_a5c250a81aed4d7fa68e005cff2132c8~mv2_d_3840_1960_s_2.jpg/v1/fill/w_3456,h_984,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/0b340f_a5c250a81aed4d7fa68e005cff2132c8~mv2_d_3840_1960_s_2.jpg"
          alt="projects"
          sizes="100vw"
          objectFit="cover"
          disableZoom={true}
        />
      </div>
      <div className="max-w-7xl mx-auto mt-[-120px] relative bg-white px-8 sm:px-20">
        <h1 className="text-center py-8 font-site">
          Check Availability & Prices
        </h1>
        <div className="max-w-4xl mx-auto">
          <h3 className="font-site text-lg my-3">
            To enquire about a reservation or simply ask a question, get in
            touch.
          </h3>
          <form className="border-2 border-blue-site p-8">
            <div className="flex flex-col sm:flex-row sm:gap-12">
              <div className="basis-1/2">
                <label className="text-xs" htmlFor="name">
                  First name *
                </label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  id="name"
                  required={true}
                />
                <label className="text-xs" htmlFor="email">
                  Email *
                </label>
                <input
                  className="input"
                  type="email"
                  name="email"
                  id="email"
                  required={true}
                />
                <label className="text-xs" htmlFor="startDate">
                  Desired start date
                </label>
                <input
                  className="input"
                  type="date"
                  name="startDate"
                  id="startDate"
                  defaultValue={
                    searchParams.startDate
                      ? new Date(searchParams.startDate)
                          .toISOString()
                          .split('T')[0]
                      : ''
                  }
                />
              </div>
              <div className="basis-1/2">
                <label className="text-xs" htmlFor="name">
                  Last name
                </label>
                <input className="input" type="text" name="last" id="last" />
                <label className="text-xs" htmlFor="phone">
                  Phone
                </label>
                <input className="input" type="tel" name="phone" id="phone" />
                <label className="text-xs" htmlFor="weeks">
                  Number of weeks
                </label>
                <input
                  className="input"
                  min={1}
                  type="number"
                  name="weeks"
                  id="weeks"
                />
              </div>
            </div>

            <label className="text-xs" htmlFor="message">
              Message
            </label>
            <input className="input" type="text" name="message" id="message" />
            <button className="btn-main w-full mt-6 text-xl" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
