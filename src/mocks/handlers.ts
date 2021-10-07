import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import faker from 'faker';
import { AddPetRequest, FindPetByIdRequest, Pet } from '../types';

export const animals = ['Snake', 'Cat', 'Dog', 'Bear', 'Tiger', 'Rat', 'Bird'];

let Pets: Pet[] = Array.from({ length: 10 }).map(createRandomPet);

export const handlers = [
  rest.get('/api/pets', (req, res, ctx) =>
    res(ctx.delay(500), ctx.status(200), ctx.json(Pets))
  ),
  rest.get<any, any, FindPetByIdRequest>('/api/pet/:id', (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json(Pets.find(findPet(req.params.id)))
    );
  }),
  rest.post<AddPetRequest, Pet>('/api/pet', (req, res, ctx) => {
    const Pet = { ...req.body, createdAt: new Date(), id: uuidv4() };

    Pets.push(Pet);
    return res(ctx.status(200), ctx.json(Pet));
  }),
  rest.put<Pet, Pet>('/api/pet/:id', (req, res, ctx) => {
    const newPet = {
      ...Pets.find(findPet(req.body.id)),
      ...req.body,
    };

    Pets.splice(Pets.findIndex(findPet(req.body.id)), 1, newPet);
    return res(ctx.delay(500), ctx.status(200), ctx.json(req.body));
  }),
];

const findPet = (id: string) => (Pet: Pet) => Pet.id === id;

function createRandomPet(): Pet {
  return {
    name: faker.name.firstName(),
    type: animals[Math.floor(Math.random() * animals.length)],
    age: faker.datatype.number(20),
    about: faker.lorem.paragraphs(),
    id: faker.datatype.uuid(),
    createdAt: faker.date.past(),
  };
}
