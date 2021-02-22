import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/client'
import Layout from '../components/layout'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault();

    signIn('credentials', {
      email,
      password,
      // The page where you want to redirect to after a
      // successful login
      callbackUrl: `${window.location.origin}/protected`
    })
  }

  useEffect(() => {
    // Getting the error details from URL
    if (router.query.error) {
      setLoginError(router.query.error) // Shown below the input field in my example
      setEmail(router.query.email) // To prefill the email after redirect
    }
  }, [router])

  return (
    <Layout>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Password"
          />
        </div>
        {loginError && <span>{loginError}</span>}
        <div>
          <button>Entrar</button>
        </div>
      </form>
    </Layout>
  )
}
