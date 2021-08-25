import axios from 'axios';
import { useEffect, useState } from 'react';

const useApi = (apiUrl: string) => {
  const apiBase = 'https://bouhm.github.io/mondstats-data/'
  // const apiBase = 'https://raw.githubusercontent.com/bouhm/mondstats-data/develop/'
  const [data, setData] = useState<any>(undefined)

  console.log(apiBase + apiUrl)
  useEffect(() => {
    // const ghp = import.meta.env.DEV ? import.meta.env.VITE_GH_PAT : import.meta.env.GH_PAT;

    const fetchApi = async () => {
      axios.get(apiBase + apiUrl, { 
        headers: { 
          'accept': 'application/vnd.github.v3.raw+json',
          // 'authorization': `token ${ghp}`
        }
      })
        .then(res => setData(res.data))
    }

    fetchApi()
  }, [apiUrl, setData])

  return data
}

export default useApi