import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AddPetRequest, Pet } from './types';

export const usePets = () => {
  return useQuery<Pet[], AxiosError>(['pets'], () =>
    axios.get<Pet[]>('/api/pets').then((res) => res.data)
  );
};

export const usePetById = ({ id }: { id: string }) => {
  return useQuery<Pet, AxiosError>(['pet', id], () =>
    axios.get<Pet>(`/api/pet/${id}`).then((res) => res.data)
  );
};

export const useCreatePet = () => {
  const queryClient = useQueryClient();

  return useMutation<Pet, AxiosError, AddPetRequest>(
    (pet) => axios.post<AddPetRequest, Pet>('/api/pet', pet),
    { onSuccess: () => queryClient.refetchQueries('pets') }
  );
};

export const useUpdatePet = () => {
  const queryClient = useQueryClient();

  return useMutation<Pet, AxiosError, Pet>(
    (pet) => axios.put<Pet, Pet>(`/api/pet/${pet.id}`, pet),
    { onSuccess: () => queryClient.refetchQueries('pet') }
  );
};
