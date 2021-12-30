// import axios from 'axios';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useApi = (path: string) => {
  // const apiBase = 'https://bouhm.github.io/mondstats-data'
  const apiBase = 'https://raw.githubusercontent.com/bouhm/mondstats-data/develop'
  const [data, setData] = useState<any>(undefined)

  useEffect(() => {
    const fetchApi = async () => {
      axios.get(apiBase + path, { 
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