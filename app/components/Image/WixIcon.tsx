import { media } from '@wix/sdk';
import Image, { ImageProps } from 'next/image';

export function WixIcon({ icon }: { icon: string }) {
  console.log(icon);

  const absoluteUrl = media.getDocumentUrl(icon);

  console.log(absoluteUrl.url);
  return <Image src={absoluteUrl.url} alt="hhh" width={90} height={90} />;
}
