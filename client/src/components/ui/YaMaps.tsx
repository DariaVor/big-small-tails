import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

export default function YandexMaps(): JSX.Element {
  const locations = [
    { id: 'location1', latitude: 55.79223, longitude: 37.715471 },
    { id: 'location2', latitude: 55.742245, longitude: 37.700029 },
  ];

  return (
    <YMaps>
      <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-2xl">
        <Map
          className="absolute inset-0 w-full h-full"
          defaultState={{ center: [55.79223, 37.715471], zoom: 10 }}
          options={{
            suppressMapOpenBlock: true,
            suppressObsoleteBrowserNotifier: true,
          }}
        >
          {locations.map((location) => (
            <Placemark key={location.id} geometry={[location.latitude, location.longitude]} />
          ))}
        </Map>
      </div>
    </YMaps>
  );
}
