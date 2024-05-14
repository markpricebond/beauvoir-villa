import {
  createClient,
  IOAuthStrategy,
  OAuthStrategy,
  WixClient,
} from '@wix/sdk';
import { items } from '@wix/data';

export type CMSCollection = Array<{
  dataCollectionId?: string;
  data?: Record<string, any> | null;
  _id?: string;
}>;

type OurWixClient = WixClient<
  undefined,
  IOAuthStrategy,
  { items: typeof items }
>;

export async function getWixClient(): Promise<OurWixClient> {
  const clientId = process.env.WIX_CLIENT_ID;
  console.log(clientId);
  if (!clientId) {
    throw new Error('Env not set up');
  }

  const wixClient = createClient({
    modules: { items },
    auth: OAuthStrategy({ clientId }),
  });

  return wixClient;
}

export const getPageCollection = async (
  wixClient: OurWixClient,
  collectionName: string,
  pageId?: string
) => {
  const { results } = await wixClient.items.queryReferencedDataItems({
    dataCollectionId: 'pages',
    referringItemFieldName: collectionName,
    referringItemId: pageId,
  });
  return results;
};

export const getCollectionOfItems = async (
  wixClient: OurWixClient,
  collectionId: string
) => {
  const items = wixClient.items
    .queryDataItems({
      dataCollectionId: collectionId,
    })
    .find();
  return items;
};

export const getPageData = async (wixClient: OurWixClient, slug?: string) => {
  const actualSlug = slug ? slug : null;
  const items = wixClient.items
    .queryDataItems({
      dataCollectionId: 'pages',
    })
    .eq('slug', actualSlug)
    .find();
  return items;
};
