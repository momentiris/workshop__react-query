import React from 'react';
import { usePets } from '../hooks';

const PetCount = () => {
  const { data } = usePets();

  return <>{data && <span>{data.length} pets in the club so far!</span>}</>;
};

export default PetCount;
