

const refreshAccessToken = async () => {
    const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include' // include cookies in req
    })

    if (!response.ok) {
        if (response.status === 403) {
            // refresh token is invalid
            return false;
        }
    }

    const result = await response.json()
    const accessToken = result.data.accessToken
    // store access token in sessionStorage
    sessionStorage.setItem('accessToken', accessToken)

    return true;
}

export default refreshAccessToken