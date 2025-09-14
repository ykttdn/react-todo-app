import { useEffect, useState } from 'react';

export function useGetRequest<T>(url: string) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url);

        if (response.ok) {
          const responseJson: T = await response.json();
          setData(responseJson);
        } else {
          setError('Unhandled error');
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, error, isLoading };
}
