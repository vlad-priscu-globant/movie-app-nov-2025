function createInterceptor() {
  return async function interceptedFetch<T = any>(
    input: RequestInfo,
    init: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('token')

    const res = await fetch(input, {
      ...init,
      headers: {
        ...(init.headers || {}),
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    if (res.status === 401) {
      window.location.href = '/login'
      localStorage.removeItem('token')
      // here we could use the refresh token strategy
      throw new Error('Unauthorized')
    }

    if (!res.ok) {
      const message = await res.text()
      throw new Error(`Request failed: ${res.status} - ${message}`)
    }

    return res.json()
  }
}

export const httpWrapper = createInterceptor()