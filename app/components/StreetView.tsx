'use client';

import React from 'react';
import { Map, Marker } from 'pigeon-maps';
import { maptiler } from 'pigeon-maps/providers';

export const StreetView = () => {
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || '';
  const maptilerProvider = maptiler(apiKey, 'streets');

  return (
    <Map
      provider={maptilerProvider}
      dprs={[1, 2]}
      height={400}
      defaultCenter={[45.49376, -0.762163]}
      defaultZoom={14}
    >
      <Marker width={50} anchor={[45.49376, -0.762163]} />
    </Map>
  );
};
