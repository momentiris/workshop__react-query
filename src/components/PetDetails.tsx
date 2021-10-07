import React from 'react';
import Form from './Form';
import { useCreatePet, usePetById, useUpdatePet } from '../hooks';

const PetDetails = ({ id }: { id: string }) => {
  const { data: pet, isLoading, isFetching } = usePetById({ id });
  const { mutate: createPet } = useUpdatePet();

  const formInitialValues = pet
    ? { name: pet.name, age: String(pet.age), about: pet.about, type: pet.type }
    : undefined;

  return (
    <div className="h-full flex flex-grow flex-col relative">
      {!isLoading && isFetching && (
        <div className="absolute right-5 top-5 border-4 border-dashed  border-yellow-400 rounded-md p-2">
          Fetching in the background...
        </div>
      )}
      <div className="h-1/2">
        {isLoading && (
          <div className="right-5 top-5 border-4 border-dashed border-yellow-400 rounded-md p-2">
            Loading pet...
          </div>
        )}
        {!isLoading && pet && (
          <>
            <div className="font-bold">Name:</div>
            <p>{pet.name}</p>
            <div className="font-bold">Type:</div>
            <p>{pet.type}</p>
            <div className="font-bold">Age:</div>
            <p>{pet.age} years old</p>
            <div className="font-bold">About:</div>
            <p>{pet.about}</p>
          </>
        )}
      </div>

      <Form
        onSubmit={(values) =>
          createPet(Object.assign({}, pet, values, { age: Number(values.age) }))
        }
        initialValues={formInitialValues}
      />
    </div>
  );
};

export default PetDetails;
