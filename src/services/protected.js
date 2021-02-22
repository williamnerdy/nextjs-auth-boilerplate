import axios from 'axios'

export const getProtectedData = async () => {
  const { data } = await axios.get('/api/protected');
  return data;
}
