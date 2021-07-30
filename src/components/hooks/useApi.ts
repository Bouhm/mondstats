import axios from 'axios';
import { useEffect, useState } from 'react';

const useApi = (apiUrl: string) => {
  const [data, setData] = useState<any>(undefined)

  useEffect(() => {
    const fetchApi = async () => {
      axios.get(apiUrl, { headers: { 'accept': 'application/vnd.github.v3.raw+json' }})
        .then(res => setData(res.data))
    }

    fetchApi()
  }, [apiUrl, setData])

  return data
}

export default useApi