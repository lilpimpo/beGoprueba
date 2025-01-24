import { useState, useEffect } from "react";

interface FetchResult<T> {
    data: T | null;
    error: string | null;
    loading:T | boolean;

}

const useFetch = <T,>(url: string): FetchResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading,setLoading]=useState<T | boolean>(true);

    useEffect(() => {
        const aborta = new AbortController();
        setLoading(true);
      //  const signal = aborta.signal;

        fetch(url, { signal : aborta.signal})
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Problema con la red!');
                }
                return response.json();
            })
            .then((data) => setData(data))
            .catch((error) => {
                if (error.name !== 'AbortError') {
                    setError(error.message);
                }
            })
            .finally(() => setLoading(false));

        return () => {
            aborta.abort();
        };
    }, [url]);

    return { data,loading ,error};
};

export default useFetch;
