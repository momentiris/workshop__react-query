import React from 'react';

import Form from './Form';
import { useCreatePet, usePets } from '../hooks';
import { animals } from '../mocks/handlers';

const Pets = ({ onClick }: { onClick: (id: string) => void }) => {
  const { data, isLoading, isFetching } = usePets();
  const { mutate: createPet } = useCreatePet();

  return (
    <div className="h-full flex flex-grow flex-col">
      {!isLoading && isFetching && (
        <div className="absolute right-5 top-5 border-4 border-dashed border-yellow-400 rounded-md p-2">
          Fetching in the background...
        </div>
      )}
      <div className="h-1/2">
        {isLoading && (
          <div className="right-5 top-5 border-4 border-dashed border-yellow-400 rounded-md p-2">
            Loading pets...
          </div>
        )}
        {!isLoading &&
          data &&
          data.map((pet: any) => (
            <div
              key={pet.id}
              className="truncate cursor-pointer "
              onClick={() => onClick(pet.id)}
            >
              {pet.name} {mapPetTypeToEmoji(pet.type)}
            </div>
          ))}
      </div>

      <Form
        onSubmit={(values) =>
          createPet(Object.assign({}, values, { age: Number(values.age) }))
        }
      />
    </div>
  );
};

const mapPetTypeToEmoji = (type: string) => {
  const iconMap: Record<string, string> = {
    Snake: '🐍',
    Cat: '🐈',
    Dog: '🐕',
    Bear: '🐻',
    Tiger: '🐅',
    Rat: '🐀',
    Bird: '🐦',
  };

  return iconMap[type];
};

export default Pets;
