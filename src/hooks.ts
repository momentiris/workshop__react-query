import React from 'react';
import axios, { AxiosError } from 'axios';

import { AddPetRequest, Pet } from './types';

type DataState<T> = {
  data: T | undefined;
  isLoading: boolean;
  error: AxiosError | undefined;
};

const initialState = {
  data: undefined,
  isLoading: false,
  error: undefined,
};

export const usePets = () => {
  const [state, setState] = React.useState<DataState<Pet[]>>(initialState);

  const get = () => {
    setState((current) => Object.assign({}, current, { isLoading: true }));
    axios
      .get<Pet[]>('/api/pets')
      .then((res) =>
        setState((current) =>
          Object.assign({}, current, { isLoading: false, data: res.data })
        )
      );
  };

  React.useEffect(() => {
    get();
  }, []);

  return { ...state, isFetching: state.isLoading, refetch: get };
};

export const usePetById = ({ id }: { id: string }) => {
  const [state, setState] = React.useState<DataState<Pet>>(initialState);

  const get = () => {
    setState((current) => Object.assign({}, current, { isLoading: true }));
    axios
      .get<Pet[]>(`/api/pet/${id}`)
      .then((res) =>
        setState((current) =>
          Object.assign({}, current, { isLoading: false, data: res.data })
        )
      );
  };

  React.useEffect(() => {
    get();
  }, []);

  return { ...state, isFetching: state.isLoading, refetch: get };
};

export const useCreatePet = () => {
  const [state, setState] = React.useState<DataState<Pet>>(initialState);
  const mutate = (pet: AddPetRequest) => {
    setState((current) => Object.assign({}, current, { isLoading: true }));
    return axios.post<AddPetRequest, Pet>('/api/pet', pet).then((res) => {
      setState((current) =>
        Object.assign({}, current, { isLoading: false, data: res })
      );
    });
  };

  return { mutate, ...state, isFetching: state.isLoading };
};

export const useUpdatePet = () => {
  const [state, setState] = React.useState<DataState<Pet>>(initialState);
  const mutate = (pet: Pet) => {
    setState((current) => Object.assign({}, current, { isLoading: true }));
    return axios
      .put<AddPetRequest, Pet>(`/api/pet/${pet.id}`, pet)
      .then((res) => {
        setState((current) =>
          Object.assign({}, current, { isLoading: false, data: res })
        );
      });
  };

  return { mutate, ...state, isFetching: state.isLoading };
};
