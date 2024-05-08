import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

export type CMSCollection = Array<{
  dataCollectionId?: string;
  data?: Record<string, any> | null;
  _id?: string;
}>;

export const getWixClient = async () => {
  const wixClient = createClient({
    modules: { items },
    auth: OAuthStrategy({ clientId: '3e125a89-df2e-43c1-a2f9-948b17331e8d' }),
  });

  return wixClient;
};

export const getPageCollection = async (
  collectionName: string,
  pageId?: string
) => {
  const wixClient = await getWixClient();

  const { results } = await wixClient.items.queryReferencedDataItems({
    dataCollectionId: 'pages',
    referringItemFieldName: collectionName,
    referringItemId: pageId,
  });
  return results;
};

export const getCollectionOfItems = async (collectionId: string) => {
  const wixClient = await getWixClient();
  const { items } = await wixClient.items
    .queryDataItems({
      dataCollectionId: collectionId,
    })
    .find();
  return items;
};

export const getPageData = async (slug?: string) => {
  const wixClient = await getWixClient();
  const actualSlug = slug ? slug : null;
  const { items } = await wixClient.items
    .queryDataItems({
      dataCollectionId: 'pages',
    })
    .eq('slug', actualSlug)
    .find();
  return items![0].data;
};
