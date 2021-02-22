import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { login } from '../../../services/auth'

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
      try {
        // Any user object returned here will be saved in the JSON Web Token
        const user = await login(credentials.password, credentials.emai)
        return user
      } catch (e) {
        const errorMessage = e.response.data.message
        // Redirecting to the login page with error messsage in the URL
        throw new Error(errorMessage + '&email=' + credentials.email)
      }
    }
  })
]

const options = {
  providers,
  secret: process.env.SECRET,
  pages: {
    error: '/login' // Changing the error redirect page to our custom login page
  }
}

export default (req, res) => NextAuth(req, res, options)
