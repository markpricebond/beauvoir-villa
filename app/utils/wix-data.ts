import {
  ApiKeyStrategy,
  IApiKeyStrategy,
  WixClient,
  createClient,
} from '@wix/sdk';
import { items } from '@wix/data';

type OurWixClient = WixClient<
  undefined,
  IApiKeyStrategy,
  { items: typeof items }
>;

export async function getWixClient(): Promise<OurWixClient> {
  const apiKey = process.env['API_KEY'];
  const siteId = process.env['SITE_ID'];

  if (!apiKey || !siteId) {
    throw new Error('Cannot find/access environment variables');
  }

  const myClient = createClient({
    modules: { items },
    auth: ApiKeyStrategy({
      apiKey,
      siteId,
    }),
  });

  return myClient;
}
