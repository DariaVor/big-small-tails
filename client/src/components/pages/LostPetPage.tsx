import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllLostPetsThunk, deleteOnePetThunk } from '../../redux/slices/pet/petThunk';
import OneLostPetCard from '../ui/OneLostPetCard';

export default function LostPetPage(): JSX.Element {
  const pets = useAppSelector((store) => store.pets.lostPets);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    void dispatch(getAllLostPetsThunk());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    void dispatch(deleteOnePetThunk(id));
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-pet/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mt-4 flex flex-wrap justify-center">
        {pets.map((pet) => (
          <div key={pet.id} className="mr-4 mb-4">
            <OneLostPetCard pet={pet} onDelete={handleDelete} onEdit={handleEdit} />
          </div>
        ))}
      </div>
    </div>
  );
}
