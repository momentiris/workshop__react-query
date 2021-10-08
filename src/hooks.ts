import axios, { AxiosError } from 'axios';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';
import { AddPetRequest, Pet } from './types';

export const usePets = <TData = Pet[]>(
  options?: UseQueryOptions<Pet[], AxiosError, TData>
) =>
  useQuery<Pet[], AxiosError>(['pets'], () =>
    axios.get<Pet[]>('/api/pets').then((res) => res.data)
  );

export const usePetById = ({ id }: { id: string }) =>
  useQuery<Pet, AxiosError>(['pet', id], () =>
    axios.get<Pet>(`/api/pet/${id}`).then((res) => res.data)
  );

export const useCreatePet = () => {
  const queryClient = useQueryClient();

  return useMutation<Pet, AxiosError, AddPetRequest>(
    (pet) => axios.post<AddPetRequest, Pet>('/api/pet', pet),
    {
      onMutate: async (res) => {
        await queryClient.cancelQueries('todos');

        // Snapshot the previous value
        const previousPets = queryClient.getQueryData<Pet[]>('pets');

        // Optimistically update to the new value
        if (previousPets) {
          queryClient.setQueryData<Pet[]>('pets', [
            ...previousPets,
            { id: Math.random().toString(), createdAt: new Date(), ...res },
          ]);
        }

        return { previousPets };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, variables, context) => {
        if (context?.previousTodos) {
          queryClient.setQueryData<Pet[]>('pets', context.previousTodos);
        }
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries('pets');
      },
    }
  );
};

export const useUpdatePet = () => {
  const queryClient = useQueryClient();

  return useMutation<Pet, AxiosError, Pet>(
    (pet) => axios.put<Pet, Pet>(`/api/pet/${pet.id}`, pet),
    { onSuccess: () => queryClient.refetchQueries('pet') }
  );
};
