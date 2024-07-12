import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getOnePetThunk } from '../../redux/slices/pet/petThunk';

type PetStatus = {
  status: string;
};

type Category = {
  category: string;
};

type Color = {
    color: string;
  };

type User = {
  username: string;
  email: string;
};

type Pet = {
  name: string;
  image: string;
  PetStatus: PetStatus;
  Category: Category;
  Color: Color;
  description: string;
  location: string;
  hasCollar: boolean;
  contactInfo: string;
  date: string;
  User: User;
};

export default function PetDetailPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const pet = useAppSelector((state) => state.pets.onePet) as Pet | null;

  useEffect(() => {
    if (id) {
      dispatch(getOnePetThunk(Number(id))).catch(console.log);
    }
  }, [dispatch, id]);

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{pet.name}</h1>
      <img src={`/img/${pet.image}`} alt={pet.name} />
      <p>Статус: {pet.PetStatus.status}</p>
      <p>Вид: {pet.Category.category}</p>
      <p>Раскрас: {pet.Color.color}</p>
      <p>Описание: {pet.description}</p>
      <p>Местонахождения: {pet.location}</p>
      {pet.hasCollar ? <p>Наличие ошейника: Присутствует</p>  : <p>Наличие ошейника: Отсутствует</p>}
      <p>Контактная информация: {pet.contactInfo}</p>
      {pet.PetStatus.status === 'Найден' ? (
        <p>Дата нахождения: {new Date(pet.date).toLocaleDateString('ru-RU')}</p>
      ) : (
        <p>Дата потери: {new Date(pet.date).toLocaleDateString('ru-RU')}</p>
      )}
      <p>
        Добавлено: {pet.User.username}
      </p>
    </div>
  );
}
