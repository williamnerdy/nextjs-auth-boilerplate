import axios from 'axios'

/*

Response:
{
  id: 1,
  name: '',
  image: '',
  email: ''
}

*/
export const login = async (email, password) => {
  const { data } = await axios.post('/auth', { email, password });
  return data
}
