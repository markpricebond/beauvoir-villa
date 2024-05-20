'use client';

import { Map, Marker } from 'pigeon-maps';
import classNames from 'classnames';

export const MapView = ({ className }: { className?: string }) => {
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

  function mapTiler(x: any, y: any, z: any) {
    return `https://api.maptiler.com/maps/satellite/${z}/${x}/${y}@2x.jpg?key=${apiKey}`;
  }

  return (
    <div className={classNames('relative overflow-hidden', className)}>
      <Map
        provider={mapTiler}
        dprs={[1, 2]}
        height={400}
        defaultCenter={[45.49376, -0.762163]}
        defaultZoom={8}
      >
        <Marker width={50} anchor={[45.49376, -0.762163]} />
      </Map>
      <div className="bg-gradient-to-t from-black to-50% absolute bottom-0 left-0 right-0 h-8 z-50"></div>
    </div>
  );
};
