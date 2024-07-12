import React from 'react';
import { Link } from 'react-router-dom';

export default function OneLostPetCard({ pet, onDelete, onEdit }): JSX.Element {
  return (
    <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
      <Link to={`/pets/${pet.id}`}>
      <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <h5 className="text-xl font-bold mb-2">{pet.name}</h5>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => onEdit(pet.id)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(pet.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
