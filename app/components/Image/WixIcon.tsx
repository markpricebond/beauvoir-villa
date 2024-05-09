import { media } from '@wix/sdk';
import Image from 'next/image';

export function WixIcon({ icon }: { icon: string }) {
  const absoluteUrl = media.getDocumentUrl(icon);

  return <Image src={absoluteUrl.url} alt="hhh" width={90} height={90} />;
}
