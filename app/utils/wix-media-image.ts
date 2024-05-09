import { media as wixMedia } from '@wix/sdk';

export function getImageProps(media: any) {
  return wixMedia.getImageUrl(media);
}

export function convertToNextImageProps(wixImageProps: {
  id: string;
  url: string;
  width?: number;
  height?: number;
  altText?: string;
  filename?: string;
}) {
  const { url, width, height, altText } = wixImageProps;
  return {
    alt: altText || '',
    src: url,
    width: width || 640,
    height: height || 320,
  };
}
