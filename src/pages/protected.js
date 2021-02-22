import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../components/layout'
import AccessDenied from '../components/access-denied'
import { getProtectedData } from '../services/protected'

export default function Page() {
  const [session, loading] = useSession()
  const [content, setContent] = useState()

  // Fetch content from protected route
  useEffect(async () => {
    const data = await getProtectedData();
    setContent(data.content)
  }, [session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>
        <strong>{content || '\u00a0'}</strong>
      </p>
    </Layout>
  )
}
