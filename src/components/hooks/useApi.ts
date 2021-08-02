import axios from 'axios';
import { useEffect, useState } from 'react';

const useApi = (apiUrl: string) => {
  const [data, setData] = useState<any>(undefined)

  useEffect(() => {
    const ghp = import.meta.env.DEV ? import.meta.env.VITE_GH_PAT : import.meta.env.GH_PAT;

    const fetchApi = async () => {
      axios.get('https://api.github.com/repos/bouhm/favonius-data/contents' + apiUrl, { 
        headers: { 
          'accept': 'application/vnd.github.v3.raw+json',
          'authorization': `token ${ghp}`
        }
      })
        .then(res => setData(res.data))
    }

    fetchApi()
  }, [apiUrl, setData])

  return data
}

export default useApi