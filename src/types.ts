export type Pet = {
  name: string;
  type: string;
  age: number;
  createdAt: Date;
  about: string;
  id: string;
};

export type AddPetRequest = Omit<Pet, 'id' | 'createdAt'>;

export type FindPetByIdRequest = {
  id: string;
};
