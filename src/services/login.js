import axios from 'axios'
const baseUrl = '/api/login'
//const baseUrl = 'http://localhost:3000/login'

//Kirjautuminen tehdään http post pyynnöllä
const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }