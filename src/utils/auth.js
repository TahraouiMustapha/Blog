

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

    return accessToken;
}

export default refreshAccessToken