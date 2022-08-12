import { useEffect, useState } from 'react';
import { api } from '../services/api';

export function useFetch<T = unknown>(
  url: string
): { data: T | null; isFetching: boolean; error: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    api
      .get(url)
      .then((res: { data: T }) => {
        setData(res.data);
      })
      .catch((err: Error) => {
        setError(true);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  return { data, isFetching, error };
}
