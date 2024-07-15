import React from 'react';
import FoundPetForm from '../ui/FoundPetForm';
import LostPetForm from '../ui/LostPetForm';

type BothAddProps = {
  found: string;
};

export default function BothAddPage({ found }: BothAddProps): JSX.Element {
  return <div>{found ? <FoundPetForm /> : <LostPetForm />}</div>;
}
