import { useState } from 'react';

export const useLoading = (initialState) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const toggleLoading = (state) => setIsLoading((t) => state ?? !t);
  return [isLoading, toggleLoading];
};
