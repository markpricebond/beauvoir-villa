import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

export const getWixClient = async () => {
  const wixClient = createClient({
    modules: { items },
    auth: OAuthStrategy({ clientId: '3e125a89-df2e-43c1-a2f9-948b17331e8d' }),
  });

  return wixClient;
};
