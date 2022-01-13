import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import { useEffect, useState } from 'react';

const useApi = (path: string) => {
  const apiBase = 'https://bouhm.github.io/mondstats-data'
  // const apiBase = 'https://raw.githubusercontent.com/bouhm/mondstats-data/develop'
  const [data, setData] = useState<any>(undefined)

  // Create `axios-cache-adapter` instance
  const cache = setupCache({
    maxAge: 24 * 60 * 60 * 1000,
    exclude: {
      query: false,
    }
  })

  // Create `axios` instance passing the newly created `cache.adapter`
  const api = axios.create({
    adapter: cache.adapter,
  })

  useEffect(() => {
    const fetchApi = async () => {
      api({
        url:  apiBase + path,
        method: 'get', 
        headers: { 
          'accept': 'application/vnd.github.v3.raw+json',
        }
      })
        .then(res => setData(res.data))
    }

    fetchApi()
  }, [path, setData])

  return data
}

export default useApi