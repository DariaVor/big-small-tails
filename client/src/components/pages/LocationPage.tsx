/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck


import React, { useEffect, useState } from 'react';

function LocationPage(): JSX.Element {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState('');

  useEffect(() => {
    const success = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const error = (error) => {
      console.error('Ошибка получения местоположения:', error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.error('Geolocation не поддерживается браузером');
    }
  }, []);

  useEffect(() => {
    const fetchCity = async () => {
      if (location.latitude && location.longitude) {
        try {
          const response = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?apikey=8c3c970b-a155-4a64-8386-09ec4eea228a&format=json&geocode=${location.longitude},${location.latitude}`
          );
          const data = await response.json();
          const fullAddress =
            data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
          setAddress(fullAddress);
        } catch (error) {
          console.error('Ошибка получения адреса:', error);
        }
      }
    };

    void fetchCity();
  }, [location]);

  return (
    <div className="min-h-screen text-white font-sans">
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl text-black font-bold mb-4">Местоположение</h1>
        {location.latitude && location.longitude && (
          <p className="text-lg mb-2 text-black">
            Ваше местоположение: {location.latitude}, {location.longitude}
          </p>
        )}
        {address && <p className="text-lg mb-4 text-black">Полный адрес: {address}</p>}
      </div>
    </div>
  );
}

export default LocationPage;

