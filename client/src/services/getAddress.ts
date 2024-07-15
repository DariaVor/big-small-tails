/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const getAddress = async (): Promise<string | null> => {
  try {
    // Получаем текущие координаты пользователя
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;

    // Запрос к API для получения адреса по координатам
    const response = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=8c3c970b-a155-4a64-8386-09ec4eea228a&format=json&geocode=${longitude},${latitude}`
    );
    const data = await response.json();
    
    const fullAddress = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
    
    return fullAddress;
  } catch (error) {
    console.error('Ошибка получения местоположения или адреса:', error);
    return null;
  }
};

export default getAddress;
