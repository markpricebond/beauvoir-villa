import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { items } from '@wix/data';

async function getCollection(collectionId: string) {
  try {
    const response = await fetch(
      `https://www.wixapis.com/wix-data/v2/items/query?dataCollectionId=${collectionId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.API_KEY || '',
          'wix-account-id': '6fa7aa9a-a927-4914-a2d4-384fbfaabde2',
          'wix-site-id': 'bdb2b98b-1729-40a4-bcab-42360d69115c',
        },
      }
    );
    return response.json();
  } catch (error) {
    console.log('Error getting collection', error);
  }
}

export default async function Test() {
  const clientId = process.env.WIX_CLIENT_ID;
  console.log(clientId);
  if (!clientId) {
    throw new Error('Env not set up');
  }
  const myClient = createClient({
    modules: { items },
    auth: ApiKeyStrategy({
      apiKey: process.env['API_KEY'] || '',
      siteId: 'bdb2b98b-1729-40a4-bcab-42360d69115c',
    }),
  });

  const collectionId = 'rooms';

  const collectionViaSDK = await myClient.items
    .queryDataItems({ dataCollectionId: collectionId })
    .find();

  const collectionViaREST = await getCollection(collectionId);

  return (
    <div className="mx-16 pt-20">
      <p>Data from traditional REST API:</p>
      <p>{JSON.stringify(collectionViaREST)}</p>
      <br></br>
      <p>Data from JS SDK:</p>
      <p>{JSON.stringify(collectionViaSDK)}</p>
    </div>
  );
}
